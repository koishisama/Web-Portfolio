import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  render,
  getMetadata,
  publicRoutes,
  projects,
  getShowcaseChapters,
} from "../.build/server/entry-server.js";

const mediaFiles = new Set();
for (const project of projects) {
  if (project.publication !== "published")
    throw new Error(`Draft project reached the public build: ${project.slug}`);
  if (
    project.showcase &&
    (project.showcase.purpose !== "showcase" ||
      project.showcase.mediaType !== "video")
  )
    throw new Error(`Invalid main showcase: ${project.slug}`);
  const ids = new Set([
    "showcase",
    "context",
    "contribution",
    "breakdown",
    "results",
    "credits",
  ]);
  const media = [
    project.cover,
    project.showcase,
    ...getShowcaseChapters(project).map((chapter) => chapter.asset),
  ];
  for (const section of project.breakdown) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || ids.has(section.id))
      throw new Error(
        `Invalid or duplicate chapter: ${project.slug}/${section.id}`,
      );
    ids.add(section.id);
    media.push(
      section.media,
      ...(section.comparison ?? []).map(({ asset }) => asset),
    );
  }
  for (const asset of media.filter(Boolean)) {
    if (!(asset.width > 0 && asset.height > 0))
      throw new Error(`Missing media dimensions: ${project.slug}/${asset.id}`);
    const files = [asset.src, asset.poster, asset.subtitles, asset.animation?.src];
    for (const sourceSet of [asset.srcSet, asset.posterSrcSet])
      if (sourceSet)
        files.push(
          ...sourceSet.split(",").map((entry) => entry.trim().split(/\s+/)[0]),
        );
    for (const file of files.filter(Boolean)) {
      if (!file.startsWith("/media/") || file.includes(".."))
        throw new Error(
          `Unexpected public media path: ${project.slug}/${asset.id}`,
        );
      mediaFiles.add(file);
    }
  }
}
for (const file of mediaFiles)
  if (!(await stat(path.join("dist", file))).size)
    throw new Error(`Empty public media file: ${file}`);

let template = await readFile("dist/index.html", "utf8");
// The small shared stylesheet can render with the static HTML without another round trip.
for (const stylesheet of template.matchAll(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^\"]+\.css)"[^>]*>/g,
)) {
  const css = await readFile(path.join("dist", stylesheet[1]), "utf8");
  template = template.replace(stylesheet[0], `<style>${css}</style>`);
}
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
