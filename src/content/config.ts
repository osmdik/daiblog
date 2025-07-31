import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const profileCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		title: z.string(),
		location: z.string(),
		availability: z.string(),
		avatar: z.string(),
		bio: z.string(),
		skills: z.array(z.object({
			name: z.string(),
			category: z.string(),
		})),
		timeline: z.array(z.object({
			date: z.string(),
			title: z.string(),
			description: z.string(),
			link: z.object({
				url: z.string(),
				text: z.string(),
			}).optional(),
		})),
	}),
});

export const collections = { 
	blog: blogCollection,
	profile: profileCollection 
};
