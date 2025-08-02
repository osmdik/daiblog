import { getCollection } from "astro:content";

export async function getAllTags(): Promise<string[]> {
	const allPosts = await getCollection("blog");
	const tags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
	return tags.filter((tag): tag is string => tag !== undefined);
}