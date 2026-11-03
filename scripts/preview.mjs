import http from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const redirects = new Set([
  "/projects/ar-interactive-scene",
  "/projects/vr-abandoned-mine-scene",
]);
const compressed = new Map();
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (redirects.has(pathname.replace(/\/$/, ""))) {
      response.writeHead(308, { Location: "/projects" });
      response.end();
      return;
    }
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(400);
      response.end();
      return;
    }
    let info;
    let status = 200;
    try {
      info = await stat(file);
      if (info.isDirectory()) {
        file = path.join(file, "index.html");
        info = await stat(file);
      }
    } catch {
      file = path.join(root, "404.html");
      info = await stat(file);
      status = 404;
    }
    const type = mime[path.extname(file)] || "application/octet-stream";
    const headers = {
      "Content-Type": type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && type === "video/mp4") {
      const start = Number(range[1]);
      const end = Math.min(Number(range[2] || info.size - 1), info.size - 1);
      if (start > end || start >= info.size) {
        response.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        response.end();
        return;
      }
      response.writeHead(206, {
        ...headers,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${info.size}`,
        "Content-Length": end - start + 1,
      });
      if (request.method === "HEAD") response.end();
      else createReadStream(file, { start, end }).pipe(response);
    } else if (
      /text|javascript|json|xml|svg/.test(type) &&
      request.headers["accept-encoding"]?.includes("gzip")
    ) {
      const key = file + info.mtimeMs;
      if (!compressed.has(key))
        compressed.set(key, gzipSync(await readFile(file)));
      const body = compressed.get(key);
      response.writeHead(status, {
        ...headers,
        "Content-Encoding": "gzip",
        Vary: "Accept-Encoding",
        "Content-Length": body.length,
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } else {
      response.writeHead(status, {
        ...headers,
        "Accept-Ranges": "bytes",
        "Content-Length": info.size,
      });
      if (request.method === "HEAD") response.end();
      else createReadStream(file).pipe(response);
    }
  } catch {
    response.writeHead(500);
    response.end("Unable to serve this file.");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${port}`),
);
