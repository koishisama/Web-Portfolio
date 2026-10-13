import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const cases = [
  "deinosavros",
  "procedural-city",
  "rhythm-rider",
  "ink-vfx",
  "one-more-second",
  "oasis-environment",
  "single-vfx-studies",
  "factory-environment",
  "low-poly-sakura-scene",
  "realistic-corner",
];
const routes = [
  "/",
  "/projects",
  "/about",
  "/contact",
  ...cases.map((slug) => "/projects/" + slug),
];
test("all public routes contain complete static markup and unique metadata", async ({
  request,
}) => {
  const titles = new Set();
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title).toBeTruthy();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    expect(html).toContain("<h1");
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('property="og:image"');
    expect(html).not.toMatch(
      /<!--app-html-->|D:[\\/]|C:[\\/]|\.research|session_id/,
    );
  }
  expect(
    (
      await request.get("/projects/ar-interactive-scene", { maxRedirects: 0 })
    ).status(),
  ).toBe(308);
  expect(
    (
      await request.get("/projects/vr-abandoned-mine-scene", {
        maxRedirects: 0,
      })
    ).headers().location,
  ).toBe("/projects");
  const missing = await request.get("/projects/does-not-exist");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("noindex,follow");
});
test("filter state survives direct links, reload and browser history", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/projects?track=programming");
  await expect(
    page.getByRole("button", { name: "Programming", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.reload();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Technical Art", exact: true })
    .click();
  await expect(page).toHaveURL(/track=technical-art/);
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page.goBack();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.goForward();
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator(".project-card")).toHaveCount(10);
  expect(errors).toEqual([]);
});
test("navigation, chapters and beat illustration work", async ({ page }) => {
  await page.goto("/");
  await page
    .locator(".project-card")
    .filter({
      has: page.getByRole("heading", { name: "Rhythm Rider", exact: true }),
    })
    .getByRole("link")
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rhythm Rider",
  );
  await expect(page).toHaveTitle(/Rhythm Rider/);
  await page.getByRole("link", { name: "03 Technical breakdown" }).click();
  await expect(page).toHaveURL(/#breakdown$/);
  await page.locator("#beat-bpm").fill("60");
  await expect(page.locator(".formula")).toContainText("10.0 units per beat");
  await page.getByRole("link", { name: "← All work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
});
test("contact clipboard success and fallback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("on your clipboard");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "mm2212425586@gmail.com",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: async () => {
        throw new Error("Denied");
      },
    });
  });
  await page.getByRole("button", { name: /Email copied/ }).click();
  await expect(page.getByRole("status")).toContainText(
    "Clipboard access is unavailable",
  );
  await expect(
    page.getByRole("link", { name: "Write an email" }),
  ).toHaveAttribute("href", "mailto:mm2212425586@gmail.com");
});
for (const width of [360, 390, 768, 1440, 1920]) {
  test("responsive layout at " + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/projects",
      "/projects/deinosavros",
      "/projects/rhythm-rider",
      "/about",
      "/contact",
    ]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      expect(overflow, route + " at " + width).toBe(false);
    }
    await page.goto("/");
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((node) => node.naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: "verification/home-" + width + ".png",
      fullPage: true,
    });
  });
}
test("media does not download videos before play and every case video plays", async ({
  page,
}) => {
  const videoRequests = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.endsWith(".mp4"))
      videoRequests.push(request.url());
  });
  await page.goto("/");
  expect(videoRequests).toEqual([]);
  for (const slug of cases) {
    await page.goto("/projects/" + slug);
    const videos = page.locator("video");
    const count = await videos.count();
    for (let index = 0; index < count; index++) {
      const current = videos.nth(index);
      await expect(current).toHaveAttribute("preload", "none");
      await current.evaluate(async (video) => {
        video.muted = true;
        await video.play();
      });
      await expect
        .poll(() => current.evaluate((video) => video.currentTime))
        .toBeGreaterThan(0.1);
      await current.evaluate((video) => video.pause());
    }
  }
});
test("WCAG checks, focus navigation and reduced motion", async ({ page }) => {
  for (const route of [
    "/",
    "/projects",
    "/projects/rhythm-rider",
    "/projects/ink-vfx",
    "/contact",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator("html")
      .evaluate((node) => getComputedStyle(node).scrollBehavior),
  ).toBe("auto");
});
test("Ink comparison switches actual captures and remains keyboard accessible", async ({
  page,
}) => {
  await page.goto("/projects/ink-vfx");
  const comparison = page.getByRole("group", {
    name: "Compare captured variants",
  });
  await expect(
    comparison.getByRole("button", { name: "Final: erosion 0.78" }),
  ).toHaveAttribute("aria-pressed", "true");
  const erosion = comparison.getByRole("button", {
    name: "Erosion 0.0",
    exact: true,
  });
  await erosion.focus();
  await page.keyboard.press("Enter");
  await expect(erosion).toHaveAttribute("aria-pressed", "true");
  await expect(comparison.locator("img")).toHaveAttribute(
    "src",
    /erosion-zero/,
  );
  await comparison.getByRole("button", { name: "Ribbon only" }).click();
  await expect(comparison.locator("img")).toHaveAttribute("src", /ribbon-only/);
  await expect
    .poll(() =>
      comparison.locator("img").evaluate((image) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(comparison.locator("figcaption")).toContainText(
    "OuterEdge_InkDrops disabled",
  );
  await comparison.screenshot({ path: "verification/ink-comparison.png" });
});
test("referenced public media exists and no private data is built", async () => {
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(file);
      else files.push(file);
    }
  }
  await walk("dist");
  for (const file of files.filter((file) =>
    /\.(html|js|json|css|xml|txt)$/.test(file),
  )) {
    const source = await readFile(file, "utf8");
    expect(source, file).not.toMatch(
      /[A-Z]:[\\/](?:Users|Profolio|FIT\d)|private_evidence|history-transcripts|\.research/,
    );
    const refs = [
      ...source.matchAll(/(?:src|poster|href)="(\/media\/[^"]+)"/g),
    ].map((match) => match[1]);
    for (const ref of refs)
      expect((await stat(path.join("dist", ref))).size).toBeGreaterThan(0);
  }
});
