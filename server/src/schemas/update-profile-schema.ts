import { z } from "zod";

function isHttpsUrl(value: string): boolean {
	if (!value.toLowerCase().startsWith("https://")) return false;
	try {
		return new URL(value).hostname.length > 0;
	} catch {
		return false;
	}
}

export const updateProfileSchema = z.object(
	{
		displayName: z
			.string({ error: "Display name must be a string." })
			.trim()
			.min(1, "Display name is required.")
			.max(40, "Display name must be at most 40 characters."),
		bio: z
			.string({ error: "Bio must be a string." })
			.trim()
			.max(160, "Bio must be at most 160 characters."),
		link: z.object(
			{
				label: z
					.string({ error: "Link label must be a string." })
					.trim()
					.min(1, "Link label is required.")
					.max(30, "Link label must be at most 30 characters."),

				url: z
					.string({ error: "Link URL must be a string." })
					.trim()
					.refine(
						isHttpsUrl,
						"Link URL must be a valid absolute https:// URL.",
					),
			},
			{ error: "Link must be an object with label and url." },
		),
	},
	{ error: "Request body must be a JSON object." },
);

export type Profile = z.infer<typeof updateProfileSchema>;
