import { createServerFn } from "@tanstack/start";
import { useMutation } from "@tanstack/react-query";

import { dub } from "~/lib/dub";
type LinkGeneratorReq = {
	url: string;
};

type LinkGeneratorRes = {
	shortLink?: string;
	error?: string;
};

const upsertLink = createServerFn(
	"POST",
	async (req: LinkGeneratorReq): Promise<LinkGeneratorRes> => {
		try {
			const { shortLink } = await dub.links.upsert({
				url: req.url,
			});

			const successResponse: LinkGeneratorRes = { shortLink };
			return successResponse;
		} catch (error) {
			console.error("Error in upsertLink:", error);
			const errorResponse: LinkGeneratorRes = {
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			};
			return errorResponse;
		}
	},
);

export function useUpsertLink() {
	return useMutation({
		mutationFn: (payload: LinkGeneratorReq) => upsertLink(payload),
	});
}
