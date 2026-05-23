#!/usr/bin/env bash
# Deploy static site: local frontend/dist → /var/www/ingwaz/public on VPS.
# Requires: local build done, SSH alias ingwaz-vps, rsync OR manual scp on Windows.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="${ROOT_DIR}/frontend/dist"
REMOTE="ingwaz-vps"
REMOTE_PATH="/var/www/ingwaz/public"

if [[ ! -f "${DIST}/index.html" ]]; then
  echo "[deploy] Missing ${DIST}/index.html — run: cd frontend && npm run build"
  exit 1
fi

echo "[deploy] Syncing ${DIST}/ → ${REMOTE}:${REMOTE_PATH}/"
rsync -avz --delete \
  "${DIST}/" \
  "${REMOTE}:${REMOTE_PATH}/"

echo "[deploy] Smoke (remote via SSH)..."
ssh -o BatchMode=yes -o ConnectTimeout=15 "${REMOTE}" \
  "curl -sS -o /dev/null -w 'ingwaz.space HTTP %{http_code}\n' -H 'Host: ingwaz.space' http://127.0.0.1/ 2>/dev/null || curl -sS -o /dev/null -w 'public index: %{http_code}\n' -k https://ingwaz.space/ || true"

echo "[deploy] Done. Verify: curl -sI https://ingwaz.space/ && curl -sS https://ingwaz.space/robots.txt"
