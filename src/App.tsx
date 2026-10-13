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
  const { pathname } = useLocation();
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
    };
    for (const [key, value] of Object.entries(fields))
      document
        .querySelector(`meta[name="${key}"],meta[property="${key}"]`)
        ?.setAttribute("content", value);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
    if (!first.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main")?.focus({ preventScroll: true });
    }
    first.current = false;
  }, [pathname]);
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
