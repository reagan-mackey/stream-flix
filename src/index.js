import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchProvider } from "./context/search-context";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <SearchProvider>
      <Router>
        <App />
      </Router>
    </SearchProvider>
  </React.StrictMode>
);
