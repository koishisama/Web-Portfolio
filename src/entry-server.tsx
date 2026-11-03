import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App";
export { getMetadata, publicRoutes } from "./metadata";
export { projects } from "./data/projects";
export { getShowcaseChapters } from "./data/showcaseChapters";
export function render(pathname: string) {
  return renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  );
}
