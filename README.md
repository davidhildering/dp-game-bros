# DP Game Bros 🎮

Portal site for the browser games of **DP Game Bros** — *Small games. Big fun.*

Static site built with [Vite](https://vitejs.dev), zero runtime dependencies.
Games live in their own repos and are embedded as static bundles.

```
index.html                     ← homepage with the game grid
games/<game-id>/index.html     ← wrapper page (top bar + fullscreen iframe)
public/games.json              ← the game manifest (drives the homepage)
public/games/<game-id>/game/   ← the game's built bundle (synced from its repo)
scripts/sync-game.sh           ← builds a game repo and copies the bundle in
.github/workflows/deploy.yml   ← deploys dist/ to GitHub Pages on push
```

## Develop

```bash
npm install
npm run dev
```

## Add a game to the site

1. Give the game repo a Vite build with relative paths (`base: "./"` in its
   Vite config) so it runs from any subfolder.
2. Create the wrapper page `games/<game-id>/index.html`
   (copy the Memory Car Lane wrapper and change title/emoji/iframe — the
   iframe points to `game/index.html`).
3. Add the wrapper as an input in `vite.config.js`.
4. Add an entry to `public/games.json` (id, title, tagline, emoji, url,
   accent color, tags).
5. Sync the bundle and commit it:
   ```bash
   npm run sync:mcl                      # or: bash scripts/sync-game.sh <game-id>
   git add public/games/<game-id>/ && git commit -m "game: add <game-id>"
   ```

## Deploy

Push to `main` — the GitHub Actions workflow builds the site and publishes it
to GitHub Pages automatically. Enable **Settings → Pages → Source:
GitHub Actions** once. Any static host works too: upload `dist/` after
`npm run build`.
