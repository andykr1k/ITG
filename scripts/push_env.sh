#!/bin/bash
set -e

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env not found."
    exit 1
fi

if [ -z "$UPLOAD_TOKEN" ]; then
    echo "❌ UPLOAD_TOKEN is not set in .env"
    exit 1
fi

if [ -z "$FILESTORAGE_API_URL_PORT" ]; then
    echo "❌ FILESTORAGE_API_URL_PORT is not set in .env"
    exit 1
fi

if [ ! -f .env ]; then
    echo "❌ No .env file found to upload."
    exit 1
fi

echo "⬆️  Uploading .env to $AWS_URL:$FILESTORAGE_API_URL_PORT ..."

response=$(curl -s -w "\n%{http_code}" \
    -X POST "$AWS_URL:$FILESTORAGE_API_URL_PORT/env" \
    -H "token: $UPLOAD_TOKEN" \
    -F "file=@.env")

body=$(echo "$response" | sed '$d')
status_code=$(echo "$response" | tail -n1)

echo "$body"
if [[ "$status_code" == "200" ]]; then
    echo "✅ Successfully uploaded .env"
else
    echo "❌ Upload failed (HTTP $status_code)"
fi
