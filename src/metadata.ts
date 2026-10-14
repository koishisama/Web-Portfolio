import { projects } from "./data/projects";
import { site } from "./data/site";
export const redirects = [
  "/projects/ar-interactive-scene",
  "/projects/vr-abandoned-mine-scene",
];
export const publicRoutes = [
  "/",
  "/projects",
  "/about",
  "/contact",
  ...projects.map((project) => `/projects/${project.slug}`),
];
export function getMetadata(path: string) {
  const pathname = path.replace(/\/$/, "") || "/";
  const project = projects.find(
    (item) => pathname === `/projects/${item.slug}`,
  );
  const names: Record<string, string> = {
    "/": site.role,
    "/projects": "Selected Work",
    "/about": "About",
    "/contact": "Contact",
  };
  const found = Boolean(project || names[pathname]);
  return {
    title: `${project?.title ?? names[pathname] ?? "Page not found"} | ${site.name}`,
    description: project?.summary ?? site.description,
    image: `${site.url}${project?.cover.src ?? "/media/social-card.jpg"}`,
    url: `${site.url}${pathname === "/" ? "/" : pathname}`,
    robots: found ? "index,follow" : "noindex,follow",
    found,
  };
}
