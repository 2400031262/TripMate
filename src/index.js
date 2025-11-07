
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";

  // Force dark theme by adding the 'dark' class on the root element.
  // globals.css defines CSS variables under .dark, so this makes dark the default.
  try {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.classList.add("dark");
      // Default palette (palette-1). Users can switch by replacing this class.
      document.documentElement.classList.add("palette-1");
    }
  } catch (e) {
    // ignore in non-browser environments
  }

  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
  