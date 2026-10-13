import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.PREVIEW_URL || "http://localhost:4173";
await mkdir("verification", { recursive: true });
const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-first-run", "--disable-extensions"],
  logLevel: "silent",
});
const records = [];
try {
  for (const [name, route] of [
    ["home", "/"],
    ["case", "/projects/deinosavros"],
  ]) {
    for (let run = 1; run <= 3; run++) {
      const result = await lighthouse(base + route, {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      });
      await writeFile(
        `verification/lighthouse-${name}-${run}.json`,
        result.report,
      );
      const { categories, audits } = result.lhr;
      const row = {
        page: name,
        run,
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        seo: Math.round(categories.seo.score * 100),
        lcp: audits["largest-contentful-paint"].numericValue,
        cls: audits["cumulative-layout-shift"].numericValue,
        tbt: audits["total-blocking-time"].numericValue,
      };
      records.push(row);
      console.log(JSON.stringify(row));
    }
  }
} finally {
  await chrome.kill();
}
await writeFile(
  "verification/lighthouse-summary.json",
  JSON.stringify(records, null, 2) + "\n",
);
