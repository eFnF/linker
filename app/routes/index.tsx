import React, { useState } from "react";

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Loader2 } from "lucide-react";
import { useUpsertLink } from "~/server";
import logo from "../assets/efnf_logo.svg";

export const Route = createFileRoute("/")({
	component: Home,
	// loader: async () => await getCount(),
});

interface ShortenedUrl {
	original: string;
	shortened: string | undefined;
}

function Home() {
	const router = useRouter();
	const state = Route.useLoaderData();
	const [url, setUrl] = useState("");
	const [shortenedUrls, setShortenedUrls] = useState<Array<ShortenedUrl>>([]);
	const { mutate, status } = useUpsertLink();

	const handleSubmit = async (e) => {
		e.preventDefault();

		mutate(
			{ url },
			{
				onSuccess: (data) =>
					setShortenedUrls([
						...shortenedUrls,
						{ original: url, shortened: data.shortLink },
					]),
				onError: (error) => {},
			},
		);

		setUrl("");
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<div className="mb-6 w-40 h-40 flex items-center justify-center">
				<img src={logo} alt="eFnF Logo" className="w-full h-full" />
			</div>
			<Card className="w-full max-w-xl">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						eFnF URL Shortener
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="url">Enter URL to shorten</Label>
							<Input
								id="url"
								type="url"
								placeholder="https://example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								required
							/>
						</div>
						{status === "pending" ? (
							<Button disabled className="w-full">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Generating eFnF URL
							</Button>
						) : (
							<Button type="submit" className="w-full">
								Shorten URL
							</Button>
						)}
					</form>

					{shortenedUrls.length > 0 && (
						<div className="mt-6 space-y-4">
							<h3 className="text-lg font-semibold">Shortened URLs:</h3>
							{shortenedUrls.map((item) => (
								<Card key={item.shortened} className="p-4">
									<p className="text-sm text-card-foreground overflow-hidden text-ellipsis whitespace-nowrap">
										Original URL: {item.original}
									</p>
									<p className="font-medium">
										<a href={item.shortened} target="_blank" rel="noreferrer">
											Short URL: {item.shortened}
										</a>
									</p>
									<Button
										variant="outline"
										size="sm"
										className="mt-2"
										onClick={() =>
											navigator.clipboard.writeText(item.shortened!)
										}
									>
										Copy to Clipboard
									</Button>
								</Card>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
