#!/bin/bash
set -a
source .env
set +a

curl -s -H "token: $UPLOAD_TOKEN" -o .env \
    "$FILESTORAGE_API_URL/env"

echo "Downloaded latest shared .env"