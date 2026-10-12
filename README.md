# ZEO Ampara

An open learning resource library for students in the Ampara education zone. The site is built with Solid 2, TypeScript, Tailwind CSS 4, and Bun, and ships as static files for GitHub Pages.

## Develop

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
bun run serve
```

The static site is written to `dist/client`. The GitHub Actions workflow builds this folder and deploys it to GitHub Pages when changes are pushed to `main`.

Course records live in `src/data/assets.ts`. Each resource stores its Google Drive file ID once; the download and view URLs are built by shared URL helpers. Cover images are stored under `public/covers/` and included in the static build.
