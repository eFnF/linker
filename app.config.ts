import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	routers: {
		ssr: {
			vite: {
				plugins: () => [tsconfigPaths()],
			},
		},
		client: {
			vite: {
				plugins: () => [tsconfigPaths()],
			},
		},
		server: {
			vite: {
				plugins: () => [tsconfigPaths()],
			},
		},
	},
});
