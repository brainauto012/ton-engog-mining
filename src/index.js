import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl = "https://engog.netlify.app/tonconnect-manifest.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);