#!/bin/bash
set -e

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env not found. Create it with:"
    echo "FILESTORAGE_API_URL=https://your-service.onrender.com"
    echo "UPLOAD_TOKEN=yourtoken"
    exit 1
fi

if [ -z "$UPLOAD_TOKEN" ]; then
    echo "❌ UPLOAD_TOKEN is not set in .env"
    exit 1
fi

if [ -z "$FILESTORAGE_API_URL" ]; then
    echo "❌ FILESTORAGE_API_URL is not set in .env"
    exit 1
fi

if [ ! -f .env ]; then
    echo "❌ No .env file found to upload."
    exit 1
fi

echo "⬆️  Uploading .env to $FILESTORAGE_API_URL ..."

response=$(curl -s -o >(cat) \
    -w "%{http_code}" \
    -X POST "$FILESTORAGE_API_URL/env" \
    -H "token: $UPLOAD_TOKEN" \
    -F "file=@.env")

echo ""
if [[ "$response" == "200" ]]; then
    echo "✅ Successfully uploaded .env"
else
    echo "❌ Upload failed (HTTP $response)"
fi
