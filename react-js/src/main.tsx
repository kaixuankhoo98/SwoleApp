import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";

import { makeServer } from "./mockApi/server.ts";

if (import.meta.env.MODE === "development") {
  makeServer({ environment: "development" });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
