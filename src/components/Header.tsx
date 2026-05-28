import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteMeta } from "../data/site";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link className="brand" to="/" aria-label={`${siteMeta.ownerName} home`}>
          <span className="brand-mark">{siteMeta.brandMark}</span>
          <span className="brand-copy">
            <strong>{siteMeta.ownerName}</strong>
            <span>{siteMeta.roleLabel}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-links${isOpen ? " is-open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
