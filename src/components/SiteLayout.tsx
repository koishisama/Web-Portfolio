import { NavLink, Outlet, Link } from "react-router-dom";
import { site } from "../data/site";

export default function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Hongtao Gao home">
            <span className="brand-symbol" aria-hidden="true">
              h<span>g</span>.
            </span>
            <span className="brand-name">
              Hongtao Gao<span>Game Programming & Technical Art</span>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            {[
              { to: "/", label: "Home" },
              { to: "/projects", label: "Work" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Hongtao Gao</p>
          <span>Systems. Effects. The space between.</span>
          <div>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={`mailto:${site.email}`}>Email ↗</a>
          </div>
        </div>
      </footer>
    </>
  );
}
