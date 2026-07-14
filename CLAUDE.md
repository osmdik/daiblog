# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - 開発サーバーを起動（localhost:4321でアクセス可能）
- `npm run build` - `astro check`（型チェック）→ `astro build` の順に実行する本番ビルド
- `npm run preview` - ビルド結果をプレビュー
- `npm run astro` - Astro CLIコマンドを実行

Node バージョンは `.node-version` で `20.19.3` に固定されている（README の記載とは異なるため `.node-version` を正とする）。テストランナーは未導入。

## アーキテクチャ概要

Astro（React統合）+ TailwindCSS で構築した静的ブログ。全ページを事前生成する SSG 構成。

### コンテンツ層（Content Collections）

`src/content/config.ts` で2つのコレクションを Zod スキーマ付きで定義している。ここが型の起点になるため、フロントマターの項目を変えるときは必ずこのファイルを更新する。

- **blog** (`src/content/blog/*.md`) - 記事。`title` / `description` / `pubDate`（必須）、`updatedDate` / `tags`（任意）。**ファイル名がそのまま slug** になり `/posts/<slug>/` で公開される。
- **profile** (`src/content/profile/main.md`) - プロフィールページのデータ源。`name` / `title` / `skills[]` / `timeline[]` など構造化された内容を持ち、`ProfileCard`・`Timeline` コンポーネントが参照する。プロフィールは Astro ファイルではなくこの Markdown を編集して更新する。

### ロジック層（`src/utils/`）

ページから getCollection の結果を渡して使う純関数を集約している。同種の処理を書く前にここを確認する。

- `tags.ts` - `getAllTags()`。全記事のタグを重複排除して返す。index とタグページの両方が使う。
- `pagination.ts` - `getPaginationData(posts, currentSlug)`。pubDate 降順で並べた記事列から前後（previous=より新しい / next=より古い）の記事を返す。記事詳細ページで使用。

### ページとルーティング（`src/pages/`）

- `index.astro` - `ProfileCard`（compact）+ `TagList` + 全記事の `PostList`
- `posts/[...slug].astro` - `getStaticPaths` で全記事を生成。`getPaginationData` を計算し `PostLayout` に渡す
- `tags/[tag].astro` / `tags/index.astro` - `getAllTags()` からタグ別一覧を生成
- `profile.astro` - profile コレクションを表示
- `rss.xml.js` - `/rss.xml` の RSS フィードエンドポイント

### 共通化されたコンポーネント（`src/components/`）

記事一覧やタグ表示は複数ページで共有される。一覧系の見た目を変えるときは各ページではなく共通コンポーネントを直す。

- `PostList.astro` - `posts` を受け取る記事リスト。index・タグページで共有
- `TagList.astro` - タグのバッジ一覧
- `ProfileCard.astro` - `variant`（`compact` など）で表示を切り替え
- `ShareButtons.tsx` - `react-share` を使う唯一の React コンポーネント（SNS共有ボタン）
- `ThemeIcon.astro` - ダークモードのトグル

### レイアウト（`src/layouts/`）

`BaseLayout`（全ページ共通の枠 + `BaseHead`/`Header`/`Footer`）と、記事用に前後ナビを加えた `PostLayout` の2段構成。

### サイト設定・スタイル

- サイトURL: `https://blog.osmdik.com`（`astro.config.mjs`）。サイト名/説明: `src/consts.ts`
- シンタックスハイライト: Shiki（monokaiテーマ、`wrap: true`）。設定は `astro.config.mjs`
- ダークモード: TailwindCSS の `class` 戦略（`tailwind.config.mjs` の `darkMode: 'class'`）。記事本文のタイポグラフィ（`code` / `a` の色など）も `tailwind.config.mjs` の typography 拡張でカスタムしている
- Google Analytics は Partytown 経由で読み込む

## コミットメッセージルール

Conventional Commits 仕様に従う。詳細は `documents/commit-message-rules.md` を参照。
