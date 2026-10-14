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
  expect(
    await page
      .locator(".project-card")
      .evaluateAll((cards) => cards.map((card) => card.dataset.project)),
  ).toEqual([
    "deinosavros",
    "procedural-city",
    "rhythm-rider",
    "one-more-second",
  ]);
  await page.reload();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.evaluate(() => window.scrollTo({ top: 80, behavior: "instant" }));
  const beforeFilter = await page.evaluate(() => scrollY);
  await page
    .getByRole("button", { name: "Technical Art", exact: true })
    .click();
  await expect(page).toHaveURL(/track=technical-art/);
  await expect(page.locator(".project-card")).toHaveCount(8);
  expect(await page.evaluate(() => scrollY)).toBe(beforeFilter);
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
    .locator('[data-project="rhythm-rider"] a[href="/projects/rhythm-rider"]')
    .first()
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rhythm Rider",
  );
  await expect(page).toHaveTitle(/Rhythm Rider/);
  await page
    .getByRole("link", { name: "Technical breakdown", exact: true })
    .click();
  await expect(page).toHaveURL(/#breakdown$/);
  await page.locator("#beat-bpm").fill("60");
  await expect(page.locator(".formula")).toContainText("24.1 units per beat");
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
    const figures = page.locator(".video-figure");
    const count = await figures.count();
    expect(await page.locator("video").count()).toBe(0);
    for (let index = 0; index < count; index++) {
      const figure = figures.nth(index);
      await figure.getByRole("button", { name: /^Play / }).click();
      const current = figure.locator("video");
      await expect(current).toHaveAttribute("preload", "none");
      await current.evaluate(async (video) => {
        video.muted = true;
        await video.play();
      });
      await expect
        .poll(() => current.evaluate((video) => video.currentTime))
        .toBeGreaterThan(0.1);
      await current.evaluate(async (video) => {
        video.currentTime = Math.max(0, video.duration - 0.2);
        await video.play();
      });
      await expect
        .poll(() => current.evaluate((video) => video.ended))
        .toBe(true);
    }
  }
});

test("cross-route chapters, direct fragments and history locate the actual section", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator('a[href="/projects/deinosavros#route-and-chance"]')
    .first()
    .click();
  await expect(page).toHaveURL(/deinosavros#route-and-chance$/);
  await expect(page.locator("#route-and-chance")).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator("#route-and-chance")
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
    )
    .toBeLessThan(160);
  await page.goto("/projects/rhythm-rider#breakdown");
  await expect(page.locator("#breakdown")).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/deinosavros#route-and-chance$/);
  await expect
    .poll(() =>
      page
        .locator("#route-and-chance")
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top)),
    )
    .toBeLessThan(160);
});

test("new playback pauses the previous film and route changes stop playback", async ({
  page,
}) => {
  await page.goto("/projects/deinosavros");
  const posters = page.locator(".video-figure");
  await posters
    .first()
    .getByRole("button", { name: /^Play / })
    .click();
  const first = posters.first().locator("video");
  await expect
    .poll(() => first.evaluate((video) => video.currentTime))
    .toBeGreaterThan(0.1);
  await page
    .locator("#combat-feedback .media-comparison")
    .getByRole("button", { name: "Combat & reward", exact: true })
    .click();
  await posters
    .nth(1)
    .getByRole("button", { name: /^Play / })
    .click();
  const second = posters.nth(1).locator("video");
  await expect
    .poll(() => second.evaluate((video) => video.currentTime))
    .toBeGreaterThan(0.1);
  await expect.poll(() => first.evaluate((video) => video.paused)).toBe(true);
  await page.evaluate(() => {
    window.previousPortfolioVideo = document.querySelectorAll("video")[1];
  });
  await page.getByRole("link", { name: "Work", exact: true }).first().click();
  await expect(page.locator("video")).toHaveCount(0);
  expect(await page.evaluate(() => window.previousPortfolioVideo.paused)).toBe(
    true,
  );
});

test("every comparison variant loads, including films outside the default selection", async ({
  page,
}) => {
  for (const slug of cases) {
    await page.goto("/projects/" + slug);
    for (const comparison of await page.locator(".media-comparison").all()) {
      for (const button of await comparison
        .locator(".comparison-controls button")
        .all()) {
        await button.click();
        await expect(button).toHaveAttribute("aria-pressed", "true");
        const poster = comparison.getByRole("button", { name: /^Play / });
        if (await poster.count()) {
          await poster.click();
          const video = comparison.locator("video");
          await expect
            .poll(() => video.evaluate((node) => node.currentTime))
            .toBeGreaterThan(0.1);
          await video.evaluate(async (node) => {
            node.currentTime = Math.max(0, node.duration - 0.2);
            await node.play();
          });
          await expect
            .poll(() => video.evaluate((node) => node.ended))
            .toBe(true);
        } else {
          await expect
            .poll(() =>
              comparison
                .locator(".comparison-panel .media-frame img")
                .evaluate((node) => node.naturalWidth),
            )
            .toBeGreaterThan(0);
        }
      }
    }
  }
});

test("visual showcase activation starts playback and restores keyboard focus", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.endsWith(".mp4"))
      requests.push(request.url());
  });
  await page.goto("/");
  const opener = page.getByRole("button", {
    name: "Play Ink VFX showcase",
    exact: true,
  });
  expect(requests).toEqual([]);
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/Ink/);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  const video = dialog.locator("video");
  await expect
    .poll(() => video.evaluate((node) => node.currentTime))
    .toBeGreaterThan(0.1);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.locator("video")).toHaveCount(0);
});

for (const slug of cases
  .slice(0, 6)
  .filter((slug) => slug !== "one-more-second")) {
  test(`${slug} has a complete main media interface on mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const requests = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname.endsWith(".mp4"))
        requests.push(request.url());
    });
    await page.goto("/projects/" + slug);
    const lead = page.locator(".case-lead-media .media-figure");
    await expect(lead).toHaveAttribute("data-media-purpose", "showcase");
    await expect(lead.getByRole("button", { name: /^Play / })).toBeVisible();
    await page.waitForTimeout(250);
    expect(requests, slug).toEqual([]);
    await page
      .locator(".case-lead-media")
      .getByRole("button", { name: /^Play / })
      .click();
    const player = page.locator(".case-lead-media video");
    await expect
      .poll(() => player.evaluate((video) => video.readyState))
      .toBeGreaterThanOrEqual(2);
    await expect(player).toHaveAttribute("playsinline", "");
    await expect
      .poll(() =>
        player.evaluate((video) => video.textTracks[0]?.cues?.length ?? 0),
      )
      .toBeGreaterThan(0);
    await player.evaluate(async (video) => {
      video.volume = 0.35;
      video.muted = false;
      await video.requestFullscreen();
    });
    expect(
      await player.evaluate(
        (video) =>
          document.fullscreenElement === video &&
          video.volume === 0.35 &&
          !video.muted,
      ),
    ).toBe(true);
    await page.evaluate(() => document.exitFullscreen());
    await player.evaluate(async (video) => {
      video.currentTime = Math.max(0, video.duration - 0.25);
      await video.play();
    });
    await expect.poll(() => player.evaluate((video) => video.ended)).toBe(true);
  });
}

test("the retained jam excerpts are clearly separate from a complete showcase", async ({
  page,
}) => {
  await page.goto("/projects/one-more-second");
  await expect(page.locator(".case-lead-media .media-figure")).toHaveAttribute(
    "data-media-purpose",
    "illustration",
  );
  const excerpts = page.locator(".available-excerpts");
  await expect(excerpts).toContainText(
    "A complete rescue, scene progression and the final dialogue are not shown.",
  );
  await expect(excerpts.locator(".media-figure")).toHaveAttribute(
    "data-media-purpose",
    "evidence",
  );
  await excerpts
    .getByRole("button", { name: /Controlled tool response/ })
    .click();
  await expect(excerpts.locator(".media-figure")).toHaveAttribute(
    "data-media-purpose",
    "evidence",
  );
  await excerpts.getByRole("button", { name: /^Play / }).click();
  await expect
    .poll(() =>
      excerpts.locator("video").evaluate((video) => video.currentTime),
    )
    .toBeGreaterThan(0.1);
  await expect(
    page.getByRole("link", { name: "Play on itch.io" }),
  ).toHaveAttribute("href", "https://morton-mao.itch.io/one-more-second");
});

test("showcase chapters support sharing, history, captions and deliberate playback", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) requests.push(request.url());
  });
  await page.goto("/projects/deinosavros?clip=map-and-chance");
  const gallery = page.locator(".showcase-gallery").first();
  const map = gallery.locator('[data-clip="map-and-chance"]');
  await expect(map).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator("figcaption")).toContainText("Hidden Spring");
  await expect(gallery.locator(".media-info")).not.toHaveAttribute("open", "");
  await gallery.locator(".media-info summary").click();
  await expect(gallery.locator(".media-info > div")).toBeVisible();
  expect(requests).toEqual([]);
  await gallery.getByRole("button", { name: /^Play / }).click();
  await expect(gallery.locator("track")).toHaveAttribute(
    "src",
    "/media/deinosavros/map-and-chance.vtt",
  );
  await expect
    .poll(() => gallery.locator("video").evaluate((video) => video.currentTime))
    .toBeGreaterThan(0.1);
  await page.evaluate(() => {
    window.previousChapterVideo = document.querySelector(
      ".gallery-player video",
    );
  });
  const combat = gallery.locator('[data-clip="combat-and-reward"]');
  await combat.focus();
  await page.keyboard.press("Enter");
  await expect(combat).toBeFocused();
  await expect(page).toHaveURL(/clip=combat-and-reward/);
  await expect(gallery.locator("video")).toHaveCount(0);
  expect(await page.evaluate(() => window.previousChapterVideo.paused)).toBe(
    true,
  );
  await page.goBack();
  await expect(map).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(map).toHaveAttribute("aria-pressed", "true");
});

test("full-size images use a named dialog with Escape and focus restoration", async ({
  page,
}) => {
  await page.goto("/projects/deinosavros#combat-feedback");
  const trigger = page.locator("#combat-feedback .image-expand").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toHaveAccessibleName(/Combat/);
  await expect
    .poll(() => dialog.locator("img").evaluate((img) => img.naturalWidth))
    .toBeGreaterThan(0);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("homepage filtering uses the accepted project grid and URL state", async ({
  page,
}) => {
  await page.goto("/?track=technical-art");
  await expect(
    page.getByRole("button", { name: "Technical Art", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Programming", exact: true }).click();
  await expect(page).toHaveURL(/track=programming/);
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Technical Art", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
});

test("failed poster and video retain a readable explanation and file access", async ({
  page,
}) => {
  await page.route("**/media/deinosavros/*.webp", (route) => route.abort());
  await page.route("**/media/deinosavros/*.jpg", (route) => route.abort());
  await page.goto("/projects/deinosavros");
  await expect(page.getByText("Image unavailable").first()).toBeVisible();
  await page.unroute("**/media/deinosavros/*.webp");
  await page.unroute("**/media/deinosavros/*.jpg");
  await page.route("**/*.mp4", (route) => route.abort());
  await page.reload();
  await page
    .locator(".case-lead-media")
    .getByRole("button", { name: /^Play / })
    .click();
  await expect(
    page.getByText("Video could not be loaded.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open video file" }),
  ).toBeVisible();
});

test("opening battle frame is complete on desktop and mobile", async ({
  page,
}) => {
  for (const size of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    for (const route of ["/", "/projects/deinosavros"]) {
      await page.goto(route);
      const picture =
        route === "/"
          ? page.locator('[data-project="deinosavros"] img').first()
          : page.locator(".case-lead-media img").first();
      await expect(picture).toBeVisible();
      const frame = await picture.boundingBox();
      expect(frame.y).toBeGreaterThanOrEqual(0);
      expect(frame.y + frame.height).toBeLessThanOrEqual(size.height + 1);
      expect(
        await picture.evaluate((node) => getComputedStyle(node).objectFit),
      ).toBe("contain");
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
  const comparison = page
    .locator("#start-with-the-motion-of-the-attack")
    .getByRole("group", {
      name: "Compare captured variants",
    });
  await expect(
    comparison.getByRole("button", { name: "Final: erosion 0.78" }),
  ).toBeVisible();
  await comparison.getByRole("button", { name: "Final: erosion 0.78" }).click();
  const erosion = comparison.getByRole("button", {
    name: "Erosion 0.0",
    exact: true,
  });
  await erosion.focus();
  await page.keyboard.press("Enter");
  await expect(erosion).toHaveAttribute("aria-pressed", "true");
  await expect(
    comparison.locator(".comparison-panel .media-frame img"),
  ).toHaveAttribute("src", /erosion-zero/);
  await comparison.getByRole("button", { name: "Ribbon only" }).click();
  await expect(
    comparison.locator(".comparison-panel .media-frame img"),
  ).toHaveAttribute("src", /ribbon-only/);
  await expect
    .poll(() =>
      comparison
        .locator(".comparison-panel .media-frame img")
        .evaluate((image) => image.naturalWidth),
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

test("GIF previews move, pause, leave the viewport and retain original video", async ({ page }) => {
  const videoRequests = [];
  page.on("request", request => {
    if (new URL(request.url()).pathname.endsWith(".mp4")) videoRequests.push(request.url());
  });
  await page.goto("/projects/ink-vfx");
  const preview = page.locator(".gallery-player .animated-preview");
  await expect(preview).toHaveAttribute("data-animation-state", "playing");
  const animation = preview.locator(".animated-frames");
  await expect(animation).toHaveAttribute("src", "/media/ink-vfx/showcase.gif");
  await expect.poll(() => animation.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  const first = await animation.screenshot();
  await page.waitForTimeout(800);
  expect((await animation.screenshot()).equals(first)).toBe(false);
  expect(videoRequests).toEqual([]);
  await preview.getByRole("button", { name: /^Pause animation:/ }).click();
  await expect(animation).toHaveCount(0);
  await expect(preview).toHaveAttribute("data-animation-state", "stopped");
  await preview.getByRole("button", { name: /^Start animation:/ }).click();
  await expect(animation).toHaveCount(1);
  await page.locator("#credits").scrollIntoViewIfNeeded();
  await expect(preview).toHaveAttribute("data-animation-state", "stopped");
  await expect(animation).toHaveCount(0);
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toHaveAttribute("data-animation-state", "playing");
  await preview.getByRole("button", { name: /^Play original video:/ }).click();
  await expect.poll(() => page.locator(".gallery-player video").evaluate(video => !video.paused && video.currentTime > 0)).toBe(true);
  await expect(page.locator('.animated-preview[data-animation-state="playing"]')).toHaveCount(0);
});

test("reduced motion avoids GIF downloads until explicit activation", async ({ page }) => {
  const requests = [];
  await page.emulateMedia({ reducedMotion: "reduce" });
  page.on("request", request => {
    if (/\.(gif|mp4)$/.test(new URL(request.url()).pathname)) requests.push(request.url());
  });
  await page.goto("/projects/ink-vfx", { waitUntil: "networkidle" });
  const preview = page.locator(".gallery-player .animated-preview");
  await expect(preview).toHaveAttribute("data-animation-state", "stopped");
  expect(requests).toEqual([]);
  await preview.getByRole("button", { name: /^Start animation:/ }).click();
  await expect(preview.locator(".animated-frames")).toBeVisible();
  await expect.poll(() => requests.filter(url => url.endsWith(".gif")).length).toBe(1);
  expect(requests.some(url => url.endsWith(".mp4"))).toBe(false);
  await page.goto("/projects/deinosavros");
  await expect(page.locator(".animated-preview")).toHaveCount(0);
});

test("failed GIF retains its still poster and playable original", async ({ page }) => {
  await page.route("**/media/ink-vfx/showcase.gif", route => route.abort());
  await page.goto("/projects/ink-vfx");
  const preview = page.locator(".gallery-player .animated-preview");
  await expect(preview.getByRole("status")).toContainText("Animation unavailable");
  await expect.poll(() => preview.locator("picture img").evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
  await expect(preview.getByRole("link", { name: "Open GIF file" })).toHaveAttribute("href", "/media/ink-vfx/showcase.gif");
  await preview.getByRole("button", { name: /^Play original video:/ }).click();
  await expect.poll(() => page.locator(".gallery-player video").evaluate(video => !video.paused && video.currentTime > 0)).toBe(true);
});

test("visual controls work without visible instruction paragraphs", async ({
  page,
}) => {
  await page.goto("/");
  const cover = page.getByRole("button", {
    name: "Play Deinosavros showcase",
    exact: true,
  });
  await expect(cover).toHaveText("");
  await cover.click();
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect
    .poll(() => dialog.locator("video").evaluate((video) => video.currentTime))
    .toBeGreaterThan(0.1);
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(cover).toBeFocused();
  await page
    .getByRole("link", { name: "Open Deinosavros case", exact: true })
    .click();
  await expect(page.locator(".case-chapters a").first()).toHaveText("");
  await expect(page.locator(".video-poster-button").first()).toHaveText("");
  await expect(
    page.getByText("Choose a clip, then press play.", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".thumb-duration").first()).toHaveText("1:16");
  const notes = page.locator("#combat-feedback .chapter-notes");
  await expect(notes).not.toHaveAttribute("open", "");
  await notes.locator("summary").click();
  await expect(notes.locator("p").first()).toBeVisible();
});
