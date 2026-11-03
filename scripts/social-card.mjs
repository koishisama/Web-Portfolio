import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";

const sources = [
  {
    src: "public/media/deinosavros/hero-1600.jpg",
    title: "Deinosavros",
    role: "Menus, map & combat UI",
    mime: "image/jpeg",
  },
  {
    src: "public/media/ink-vfx/showcase-poster-1920.jpg",
    title: "Ink VFX",
    role: "Niagara, materials & timing",
    mime: "image/jpeg",
  },
];
const pictures = await Promise.all(
  sources.map(async (source) => ({
    ...source,
    data: (await readFile(source.src)).toString("base64"),
  })),
);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;padding:38px 40px;background:linear-gradient(115deg,#e1e8dc,#edf2e9 46%,#dce8e9);color:#263b3a;font-family:Arial,Helvetica,sans-serif}h1{font-size:43px;margin:0 0 12px;font-weight:600}header p{font-size:23px;margin:0}.gallery{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:28px}figure{margin:0}img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;padding:5px;background:#fafbf7;border-radius:6px}h2{font-size:20px;margin:13px 0 7px}figcaption p{font-size:16px;margin:0;color:#536562}footer{font-size:16px;margin-top:24px;color:#536562;display:flex;justify-content:space-between}
    </style><header><h1>Hongtao Gao</h1><p>Game Programmer &amp; Technical Artist</p></header><div class="gallery">${pictures.map((source) => `<figure><img src="data:${source.mime};base64,${source.data}" alt="${source.title}"><figcaption><h2>${source.title}</h2><p>${source.role}</p></figcaption></figure>`).join("")}</div><footer><span>Selected Unity &amp; Unreal Engine work</span><span>github.com/koishisama</span></footer></html>`);
  await page.evaluate(() =>
    Promise.all([...document.images].map((img) => img.decode())),
  );
  await page.screenshot({
    path: "public/media/social-card.jpg",
    type: "jpeg",
    quality: 91,
  });
  console.log(
    "Generated the 1200 × 630 social image from actual project media.",
  );
} finally {
  await browser.close();
}
