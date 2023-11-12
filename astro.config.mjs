import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

export default defineConfig({
	site: 'https://blog.osmdik.com',
	integrations: [mdx(), sitemap(), tailwind(), partytown({
		// Adds dataLayer.push as a forwarding-event.
		config: {
			forward: ["dataLayer.push"],
		},
	}),],
	markdown: {
		shikiConfig: {
			// Shikiの組み込みテーマから選択（または独自のテーマを追加）
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: 'monokai',
			// カスタム言語の追加
			// 注：Shikiには.astroを含む無数の言語が内蔵されています。
			// https://github.com/shikijs/shiki/blob/main/docs/languages.md
			langs: [],
			// 水平スクロールを防ぐために文字の折り返しを有効にする
			wrap: true,
		},
	},
});
