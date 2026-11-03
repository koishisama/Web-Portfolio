import { useEffect } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { site } from "../data/site";
import Icon from "./Icon";

const revealTargets =
  ".project-card, .home-about, .skill-group, .timeline li, .breakdown-module, .unit-list > li, .skill-evidence > article";

// Fade sections in as they scroll into view; anything already on screen is left alone.
function useReveal(pathname: string) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = (node: Element) => node.setAttribute("data-reveal", "shown");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(revealTargets).forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight) return;
      node.setAttribute("data-reveal", "pending");
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      document.querySelectorAll('[data-reveal="pending"]').forEach(show);
    };
  }, [pathname]);
}

export default function SiteLayout() {
  useReveal(useLocation().pathname);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Link className="brand" to="/" aria-label="Hongtao Gao home">
            <span className="brand-mark" aria-hidden="true"><Icon name="gamepad" /></span>
            Hongtao Gao
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/projects">Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/reflection">Reflection</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {site.resume ? (
              <a className="nav-cv" href={site.resume} download>
                <Icon name="download" /> CV
              </a>
            ) : null}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner container">
          <p>© {new Date().getFullYear()} Hongtao Gao</p>
          <p>Game Programmer &amp; Technical Artist</p>
          <div>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {site.profiles
              .filter((profile) => profile.href)
              .map((profile) => (
                <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer">
                  {profile.label}
                </a>
              ))}
            <a href={`mailto:${site.email}`}>Email</a>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
