// app/client.tsx
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";

const router = createRouter();

const rootElement = document.getElementById("root");

if (rootElement) {
	hydrateRoot(rootElement, <StartClient router={router} />);
} else {
	console.error("Root element not found");
}
