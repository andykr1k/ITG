#!/bin/bash
set -e

if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
else
    echo "❌ .env.local not found. Create it with:"
    echo "API_URL=https://your-service.onrender.com"
    echo "UPLOAD_TOKEN=yourtoken"
    exit 1
fi

if [ -z "$UPLOAD_TOKEN" ]; then
    echo "❌ UPLOAD_TOKEN is not set in .env.local"
    exit 1
fi

if [ -z "$API_URL" ]; then
    echo "❌ API_URL is not set in .env.local"
    exit 1
fi

if [ ! -f .env ]; then
    echo "❌ No .env file found to upload."
    exit 1
fi

echo "⬆️  Uploading .env to $API_URL ..."

response=$(curl -s -o >(cat) \
    -w "%{http_code}" \
    -X POST "$API_URL/env" \
    -H "token: $UPLOAD_TOKEN" \
    -F "file=@.env")

echo ""
if [[ "$response" == "200" ]]; then
    echo "✅ Successfully uploaded .env"
else
    echo "❌ Upload failed (HTTP $response)"
fi
