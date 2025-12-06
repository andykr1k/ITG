#!/bin/bash
set -a
source .env
set +a

curl -s -H "token: $TOKEN" -o .env \
    "$API_URL/env"

echo "Downloaded latest shared .env"