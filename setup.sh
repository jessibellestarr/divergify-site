#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="divergify-web"
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
INDEX_FILE="${PROJECT_ROOT}/index.html"
ASSETS_DIR="${PROJECT_ROOT}/assets"
STYLES_FILE="${PROJECT_ROOT}/styles.css"
SCRIPT_PATH="${PROJECT_ROOT}/setup.sh"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Install $1 before running this script." >&2
    exit 1
  fi
}

require_cmd git
require_cmd gh

if [ ! -f "$INDEX_FILE" ]; then
  echo "index.html not found next to setup.sh. Run this script from Applications/divergify-website." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Authenticate with GitHub CLI via 'gh auth login' before running this script." >&2
  exit 1
fi

GITHUB_USER="$(gh api user --jq '.login')"

if gh repo view "${GITHUB_USER}/${REPO_NAME}" >/dev/null 2>&1; then
  echo "GitHub repo ${GITHUB_USER}/${REPO_NAME} already exists; using it."
else
  echo "Creating GitHub repo ${REPO_NAME}..."
  gh repo create "${REPO_NAME}" --public --confirm >/dev/null
fi

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

cd "$WORKDIR"
git clone "https://github.com/${GITHUB_USER}/${REPO_NAME}.git" >/dev/null
cp "$INDEX_FILE" "${REPO_NAME}/index.html"
mkdir -p "${REPO_NAME}/assets"
cp -R "$ASSETS_DIR"/. "${REPO_NAME}/assets/"
cp "$STYLES_FILE" "${REPO_NAME}/styles.css"
cp "$SCRIPT_PATH" "${REPO_NAME}/setup.sh"

cd "${REPO_NAME}"
git add index.html assets styles.css setup.sh
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "chore: add Divergify web experience"
  git push origin main
fi

echo "Repo URL: https://github.com/${GITHUB_USER}/${REPO_NAME}"
