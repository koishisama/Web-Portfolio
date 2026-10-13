import { NavLink, Outlet, Link } from "react-router-dom";
import { site } from "../data/site";

export default function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Link className="brand" to="/" aria-label="Hongtao Gao home">
            Hongtao Gao
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/projects">Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">
              Contact <span aria-hidden="true">↗</span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer container">
        <p>© {new Date().getFullYear()} Hongtao Gao</p>
        <p>Game Programmer &amp; Technical Artist</p>
        <div>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={`mailto:${site.email}`}>Email ↗</a>
        </div>
      </footer>
    </>
  );
}
