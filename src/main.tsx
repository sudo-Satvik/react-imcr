import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/open-sans"; // Defaults to weight 400
import "@fontsource/open-sans/700.css"; // Optional: Select specific weights

createRoot(document.getElementById("root")!).render(<App />);
