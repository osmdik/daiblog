import type { CollectionEntry } from 'astro:content';

export interface PaginationData {
	previousPost: CollectionEntry<'blog'> | null;
	nextPost: CollectionEntry<'blog'> | null;
}

export function getPaginationData(
	posts: CollectionEntry<'blog'>[],
	currentSlug: string
): PaginationData {
	// 記事を公開日順でソート（新しい順）
	const sortedPosts = posts.sort((a, b) => 
		b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug);

	if (currentIndex === -1) {
		return { previousPost: null, nextPost: null };
	}

	// previousPost: より新しい記事（配列の前の要素）
	const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
	
	// nextPost: より古い記事（配列の次の要素）
	const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

	return { previousPost, nextPost };
}