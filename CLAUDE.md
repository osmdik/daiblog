# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - 開発サーバーを起動（localhost:4321でアクセス可能）
- `npm run build` - 本番用ビルド（型チェック込み）
- `npm run preview` - ビルド結果をプレビュー
- `npm run astro` - Astro CLIコマンドを実行

## アーキテクチャ概要

このプロジェクトはAstroフレームワークを使用したTailwindCSS（ダークモード対応）の個人ブログサイトです。

### 主要技術スタック
- **Astro** - 静的サイトジェネレーター（React統合）
- **TailwindCSS** - CSS フレームワーク（Typography プラグイン使用）
- **TypeScript** - 型安全性のため
- **MDX** - マークダウンでブログ記事を作成

### プロジェクト構造
- `src/content/blog/` - ブログ記事（.mdファイル）
- `src/components/` - 再利用可能なAstroコンポーネント
- `src/layouts/` - レイアウトコンポーネント（BaseLayout、PostLayout）
- `src/pages/` - ページルーティング（index、posts、tags、profile）
- `src/styles/global.css` - グローバルスタイル

### コンテンツ管理
ブログ記事は `src/content/config.ts` で定義されたスキーマに従います：
- `title` (必須) - 記事タイトル
- `description` (必須) - 記事の説明
- `pubDate` (必須) - 公開日
- `updatedDate` (オプション) - 更新日
- `tags` (オプション) - タグ配列

### サイト設定
- サイトURL: `https://blog.osmdik.com`
- サイト名/説明: `src/consts.ts` で管理
- シンタックスハイライト: Shiki（monokaiテーマ）使用

### ダークモード
TailwindCSSのclass戦略でダークモードを実装。`ThemeIcon` コンポーネントでトグル機能を提供。