import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectCaseStudyPage from "./pages/ProjectCaseStudyPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getMetadata, redirects } from "./metadata";
function NavigationEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    const meta = getMetadata(pathname);
    document.title = meta.title;
    const fields: Record<string, string> = {
      description: meta.description,
      robots: meta.robots,
      "og:title": meta.title,
      "og:description": meta.description,
      "og:image": meta.image,
      "og:url": meta.url,
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      "twitter:image": meta.image,
      "twitter:url": meta.url,
    };
    for (const [key, value] of Object.entries(fields))
      document
        .querySelector(`meta[name="${key}"],meta[property="${key}"]`)
        ?.setAttribute("content", value);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
  }, [pathname]);
  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const frame = requestAnimationFrame(() => {
      let targetId = hash.slice(1);
      try {
        targetId = decodeURIComponent(targetId);
      } catch {
        /* Keep malformed fragments harmless. */
      }
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        if (!target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } else if (!isFirst) {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (
    <>
      <NavigationEffects />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          {redirects.map((path) => (
            <Route
              key={path}
              path={path}
              element={<Navigate to="/projects" replace />}
            />
          ))}
          <Route path="projects/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
