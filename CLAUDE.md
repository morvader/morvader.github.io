# CLAUDE.md — AI Assistant Guide for morvader.github.io

This file provides context and conventions for AI assistants (Claude Code and similar tools) working in this repository.

---

## Project Overview

This is a **Hugo-based personal blog** focused on software testing and quality assurance. It is published at [testingfromthetrenches.com](https://www.testingfromthetrenches.com).

- **Author**: Francisco Moreno
- **Language**: Spanish (es)
- **Hugo version**: 0.145.0
- **Theme**: LoveIt (git submodule at `themes/LoveIt`)
- **Deployment**: GitHub Pages via GitHub Actions

---

## Repository Structure

```
morvader.github.io/
├── archetypes/
│   └── default.md          # Template for new posts (hugo new)
├── assets/
│   └── data/
│       └── social.yml      # Social network links configuration
├── content/                # All site content (markdown files)
│   ├── posts/              # Blog articles (22 posts, primary content)
│   ├── talks/              # Speaking engagements list
│   ├── maturity-model/     # QA maturity assessment questionnaire
│   └── exploratory-extension/  # Chrome extension documentation
├── layouts/                # Custom Hugo template overrides
│   ├── _internal/
│   │   └── twitter_cards.html
│   └── partials/
│       └── head/
│           └── seo.html    # SEO: Open Graph, JSON-LD, Twitter Cards
├── static/
│   ├── images/             # 55 images organised by topic
│   └── robots.txt
├── themes/LoveIt/          # Hugo theme (git submodule — do not edit directly)
├── public/                 # Generated output (git-ignored, produced by build)
├── resources/              # Hugo resource cache (git-ignored)
├── hugo.toml               # Main site configuration (640 lines)
├── .gitmodules             # LoveIt submodule reference
├── .github/workflows/
│   └── hugo.yml            # CI/CD: build and deploy to GitHub Pages
└── .devcontainer/          # Dev container (Docker) definition
```

---

## Common Development Commands

Hugo must be installed (v0.145.0 extended). The dev container already provides this.

```bash
# Start local development server (hot reload on http://localhost:1313)
hugo server

# Start server and include draft posts
hugo server -D

# Build production site into ./public/
hugo --gc --minify

# Create a new blog post from the archetype template
hugo new posts/my-new-post.md

# Initialise / update the LoveIt theme submodule (required after fresh clone)
git submodule update --init --recursive
```

There is no `package.json` — this is a pure Hugo project with no Node.js build step in the root.

---

## Writing & Publishing Posts

### Creating a new post

```bash
hugo new posts/PostName.md
```

This uses `archetypes/default.md` and creates the file in `content/posts/`.

### Front matter conventions

Every post uses YAML front matter. Required and important fields:

```yaml
---
title: "Post title"
subtitle: ""
date: 2026-01-01T00:00:00+01:00
lastmod: 2026-01-01T00:00:00+01:00
draft: true          # Set to false to publish
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "SEO meta description (important — keep it ~150 chars)"

# Use specific testing/QA terms for SEO:
# "Automatización", "API Testing", "Testing Exploratorio", "Unit testing",
# "QA", "Estrategia", "Calidad", "Cultura", "Herramientas", "IA", "Carrera"
tags: []
categories: []

featuredImage: ""        # Path relative to /static/ (e.g. /images/topic/img.jpg)
featuredImagePreview: "" # Smaller preview image (can be same as featuredImage)

hiddenFromHomePage: false
hiddenFromSearch: false
lightgallery: true       # Enable image gallery support

toc:
  enable: true
  auto: true
code:
  copy: true
  maxShownLines: 50
math:
  enable: false          # Enable only if the post uses KaTeX math
share:
  enable: true
comment:
  enable: false
---
```

**Do not change `author`, `authorLink`, or `license` fields.**

### Publishing a draft

Change `draft: true` to `draft: false` in front matter. The CI pipeline only builds non-draft content.

---

## Content Conventions

- **Language**: All posts are written in **Spanish**.
- **Tone**: Technical but accessible; aimed at QA practitioners and developers.
- **Topics**: Test automation, exploratory testing, API testing, QA strategy, quality culture, AI in testing.
- **Markdown flavour**: CommonMark via Goldmark. Supported extensions: definition lists, footnotes, linkify, strikethrough, task lists, typographer.
- **Code blocks**: Use fenced code blocks with language identifiers (e.g. ` ```python `).
- **Images**: Place images under `static/images/<topic>/`. Reference them as `/images/<topic>/filename.jpg` in markdown.
- **Tags**: Use existing tags from the blog for consistency; check `hugo.toml` keywords for the canonical list.

---

## Site Configuration (hugo.toml)

Key sections to know:

| Section | Purpose |
|---|---|
| `[author]` | Author name, email, LinkedIn link |
| `[menu]` | Main navigation items |
| `[params.home]` | Home page subtitle / TypeIt animation |
| `[params.search]` | Lunr search (max 10 results) |
| `[params.analytics.google]` | GA4 tracking (ID: G-4WPG4T90RQ) |
| `[params.social]` | Social profile links |
| `[markup]` | Goldmark + syntax highlighting settings |

**Do not change analytics IDs, verification keys, or the base URL** unless explicitly instructed.

---

## SEO & Custom Layouts

### `layouts/partials/head/seo.html`

Overrides the theme's default SEO partial. Implements:
- Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- Twitter/X Card meta tags
- JSON-LD structured data (WebSite, Person, BlogPosting schemas)
- Site verification tags (Google, Bing, Yandex, Pinterest, Baidu)
- Canonical URL

When editing this file, preserve all schema.org properties and verify that Open Graph and Twitter Card tags remain complete.

### `layouts/_internal/twitter_cards.html`

Generates Twitter large-image summary cards. Depends on `featuredImage` being set in post front matter.

---

## Theme (LoveIt)

The LoveIt theme lives at `themes/LoveIt/` and is a **git submodule**.

- **Never edit files inside `themes/LoveIt/` directly.** Override them by placing equivalent files under `layouts/` or `assets/` in the repo root.
- To update the theme: `git submodule update --remote themes/LoveIt` (do this carefully and test locally first).
- Dark/light/auto mode is supported; the default is set in `hugo.toml` under `[params]`.

---

## CI/CD Pipeline (.github/workflows/hugo.yml)

The GitHub Actions workflow triggers on:
- Push to `main` or `master`
- Manual workflow dispatch

**Build steps:**
1. Install Hugo v0.145.0 (extended)
2. Install Dart Sass
3. Checkout with `--recurse-submodules` (fetches LoveIt theme)
4. Run `hugo --gc --minify --baseURL <pages-url>`
5. Upload `./public` artifact and deploy to GitHub Pages

The `public/` directory is **generated output** — never commit it manually.

---

## Dev Container

A `.devcontainer/` configuration is provided for VS Code / GitHub Codespaces:

- **Base image**: `hugomods/hugo:0.145.0`
- **Exposed port**: 1313
- **Pre-installed**: git, openssh, bash, curl, Node.js, npm
- **Default command**: `hugo server --bind=0.0.0.0`

After opening the dev container, run `git submodule update --init --recursive` if the theme is not present.

---

## Git Conventions

- **Main branch**: `master`
- **Feature branches**: `claude/<description>-<id>` (used by AI-assisted PRs)
- Commit messages are in English, short and descriptive.
- The `public/` and `resources/` directories are git-ignored.

---

## What AI Assistants Should and Should Not Do

**Do:**
- Create new posts using `hugo new posts/Name.md` and edit the resulting file.
- Follow the front matter template in `archetypes/default.md` exactly.
- Place images in `static/images/<topic>/` and reference them with absolute paths.
- Keep all user-facing content in **Spanish**.
- Respect existing tag vocabulary for SEO consistency.
- Override theme templates by creating files under `layouts/` (never edit `themes/`).

**Do not:**
- Edit files inside `themes/LoveIt/` directly.
- Commit the `public/` build output.
- Change `draft: false` on posts without explicit instruction.
- Modify Google Analytics IDs, site verification keys, or the `baseURL`.
- Add Node.js tooling or a `package.json` unless explicitly requested.
- Remove or alter schema.org structured data in `layouts/partials/head/seo.html`.
