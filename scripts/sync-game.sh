#!/usr/bin/env bash
# Build a game repo and copy its bundle into this site.
# Usage: bash scripts/sync-game.sh <game-id> [path-to-repo]
set -euo pipefail

GAME_ID="${1:?Usage: sync-game.sh <game-id> [repo-path]}"
REPO="${2:-$(dirname "$0")/../../$GAME_ID}"

echo "▶ Building $REPO ..."
(cd "$REPO" && npm run build)

echo "▶ Copying bundle → public/games/$GAME_ID/game/"
rm -rf "public/games/$GAME_ID/game"
mkdir -p "public/games/$GAME_ID"
cp -R "$REPO/dist" "public/games/$GAME_ID/game"

echo "✓ Synced $GAME_ID"
