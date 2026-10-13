import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import {
  render,
  getMetadata,
  publicRoutes,
  projects,
} from "../.build/server/entry-server.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
for (const route of [...publicRoutes, "/404"]) {
  const meta = getMetadata(route);
  const head = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    `<link rel="canonical" href="${meta.url}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Hongtao Gao" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    ...["og", "twitter"].flatMap((prefix) =>
      Object.entries({
        title: meta.title,
        description: meta.description,
        image: meta.image,
        url: meta.url,
      }).map(
        ([key, value]) =>
          `<meta ${prefix === "og" ? "property" : "name"}="${prefix}:${key}" content="${escape(value)}" />`,
      ),
    ),
  ].join("\n    ");
  const html = template
    .replace("<!--page-head-->", head)
    .replace("<!--app-html-->", render(route));
  const file =
    route === "/404" ? "dist/404.html" : path.join("dist", route, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.map((route) => `<url><loc>${getMetadata(route).url}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  "User-agent: *\nAllow: /\nSitemap: https://web-portfolio-eta-eosin.vercel.app/sitemap.xml\n",
);
console.log(
  `Prerendered ${publicRoutes.length} public pages and a 404 page (${projects.length} projects).`,
);
