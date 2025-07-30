# daiblog

> Technical note by Daiki Oshima - A minimal and modern blog built with Astro

## 🚀 Overview

daiblog is a personal technical blog created by Daiki Oshima, a frontend engineer. This site serves as an accumulation of technical knowledge and outputs, built with modern web technologies for optimal performance and developer experience.

**🌐 Live Site**: [blog.osmdik.com](https://blog.osmdik.com)

## ✨ Features

- 📝 **Markdown-based content** - Write articles in Markdown with MDX support
- 🌙 **Dark mode toggle** - Seamless theme switching
- 📱 **Responsive design** - Mobile-first approach with TailwindCSS
- 🏷️ **Tag system** - Organize and filter articles by tags
- 📖 **Typography** - Beautiful reading experience with @tailwindcss/typography
- 🔍 **SEO optimized** - Sitemap, RSS feed, and meta tags
- ⚡ **Fast performance** - Static site generation with Astro
- 🎨 **Minimal design** - Clean and focused user interface
- 📊 **Analytics ready** - Google Analytics integration via Partytown
- 🔗 **Social sharing** - Built-in social media share buttons

## 🛠️ Tech Stack

### Core Framework

- **[Astro](https://astro.build/)** `5.12.5` - Static site generator
- **[React](https://react.dev/)** `19.1.1` - Interactive components
- **[TypeScript](https://www.typescriptlang.org/)** `5.2.2` - Type safety

### Styling & UI

- **[TailwindCSS](https://tailwindcss.com/)** `3.4.17` - Utility-first CSS framework
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typographic defaults
- **[@fontsource/josefin-sans](https://fontsource.org/)** - Web font optimization

### Astro Integrations

- **[@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)** - React component support
- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** - TailwindCSS integration
- **[@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)** - MDX support for dynamic content
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Automatic sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/integrations-guide/rss/)** - RSS feed generation
- **[@astrojs/partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)** - Third-party script optimization

### Additional Libraries

- **[react-share](https://github.com/nygardk/react-share)** - Social media sharing components

## 🏗️ Project Structure

```
daiblog/
├── public/                 # Static assets
│   ├── images/            # Blog post images
│   ├── fonts/             # Web fonts
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # Reusable Astro/React components
│   │   ├── BaseHead.astro      # HTML head with meta tags
│   │   ├── Header.astro        # Site header with navigation
│   │   ├── Footer.astro        # Site footer
│   │   ├── ThemeIcon.astro     # Dark mode toggle
│   │   ├── ShareButtons.tsx    # Social sharing buttons
│   │   └── FormattedDate.astro # Date formatting component
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog post markdown files
│   │   └── config.ts      # Content schema definition
│   ├── layouts/           # Page layouts
│   │   ├── BaseLayout.astro    # Base HTML structure
│   │   └── PostLayout.astro    # Blog post layout
│   ├── pages/             # File-based routing
│   │   ├── index.astro         # Homepage
│   │   ├── profile.astro       # About page
│   │   ├── rss.xml.js          # RSS feed endpoint
│   │   ├── posts/[...slug].astro # Dynamic blog post pages
│   │   └── tags/               # Tag-based filtering
│   ├── styles/
│   │   └── global.css          # Global styles
│   └── consts.ts          # Site constants
├── documents/             # Documentation
│   └── commit-message-rules.md # Conventional Commits guide
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
├── CLAUDE.md              # Development guidance
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22.17.1 (LTS) or higher
- **npm** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/osmdik/daiblog.git
   cd daiblog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit [http://localhost:4321](http://localhost:4321)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (with type checking)
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

## 📝 Content Management

### Writing Blog Posts

Blog posts are written in Markdown with frontmatter metadata:

```markdown
---
title: "Your Post Title"
description: "Brief description of the post"
pubDate: 2025-01-15
updatedDate: 2025-01-16 # Optional
tags: ["JavaScript", "React", "TypeScript"] # Optional
---

Your content here...
```

### Content Schema

All blog posts must include:

- **title** (required) - Post title
- **description** (required) - SEO description
- **pubDate** (required) - Publication date
- **updatedDate** (optional) - Last updated date
- **tags** (optional) - Array of tag strings

### Adding Images

Place images in the `public/images/` directory and reference them in your markdown:

```markdown
![Alt text](/images/your-image.jpg)
```

## 🎨 Styling & Theming

### Dark Mode

The site supports system preference detection and manual toggle:

- Uses TailwindCSS `class` strategy
- Implemented via `ThemeIcon` component
- Persists user preference in localStorage

### Customization

- **Colors**: Modify `tailwind.config.mjs`
- **Typography**: Configured via `@tailwindcss/typography`
- **Fonts**: Josefin Sans loaded via `@fontsource`

## 📦 Deployment

### Vercel (Recommended)

This site is optimized for Vercel deployment:

1. **Connect repository** to Vercel
2. **Set build command**: `npm run build`
3. **Set output directory**: `dist`
4. **Deploy** automatically on git push

### Manual Deployment

```bash
npm run build
# Upload contents of `dist/` to your hosting provider
```

## 🔧 Development

### Code Quality

- **TypeScript** for type safety
- **Conventional Commits** for consistent git history
- **ESLint** and **Prettier** ready (add if needed)

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(blog): add dark mode toggle
fix(posts): resolve tag display issue
docs: update README with new features
```

See `documents/commit-message-rules.md` for detailed guidelines.

## 📊 Analytics & Performance

- **Google Analytics** integration via Partytown
- **Lighthouse** optimized for performance
- **SEO** friendly with sitemap and meta tags
- **RSS feed** available at `/rss.xml`

## 👨‍💻 Author

**Daiki Oshima** - Software Engineer

- Blog: [blog.osmdik.com](https://blog.osmdik.com)
- GitHub: [@osmdik](https://github.com/osmdik)

---

_Built with ❤️ using Astro, TailwindCSS, and modern web technologies_
