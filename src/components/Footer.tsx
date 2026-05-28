import { Link } from "react-router-dom";
import { siteMeta } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <p className="eyebrow">Game Portfolio</p>
          <h2 className="footer-title">{siteMeta.ownerName}</h2>
          <p className="footer-copy">
            A hybrid game portfolio focused on systems, effects, and environment work.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-note">
          <p>Resume and professional links can be added from the contact page.</p>
          <p>The current build now uses real project media from the local asset library.</p>
        </div>
      </div>
    </footer>
  );
}
