// app/router.tsx
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		context: {
			queryClient,
		},
		defaultPreload: "intent",
		// Since we're using React Query, we don't want loader calls to ever be stale
		// This will ensure that the loader is always called when the route is preloaded or visited
		defaultPreloadStaleTime: 0,
		defaultNotFoundComponent: () => <h1>404 - Page Not Found</h1>,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
