import { createRoot } from "react-dom/client";
import App from "../../src/Route/App";

test("test", () => {
  const root = document.createElement("div");
  createRoot(root).render(<App />);
})