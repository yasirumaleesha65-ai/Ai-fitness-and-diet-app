import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FitnessAppProvider } from "./context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FitnessAppProvider>
      <App />
    </FitnessAppProvider>
  </BrowserRouter>
);
