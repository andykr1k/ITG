#!/bin/bash
set -a
source .env
set +a

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Download .env to temp file
TEMP_ENV=$(mktemp)
curl -s -H "token: $UPLOAD_TOKEN" -o "$TEMP_ENV" \
    "$FILESTORAGE_API_URL/env"

# Copy to all target directories
TARGETS=(
    "database"
    "mobile"
    "server"
    "scripts"
    "web"
)

for dir in "${TARGETS[@]}"; do
    cp "$TEMP_ENV" "$PROJECT_ROOT/$dir/.env"
    echo "Updated $dir/.env"
done

rm "$TEMP_ENV"
echo "Downloaded and distributed .env to all targets"