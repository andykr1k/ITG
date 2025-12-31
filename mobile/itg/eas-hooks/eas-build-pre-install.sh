#!/usr/bin/env bash

# EAS Build hook to create .env file from environment variables
# This runs before npm install, so we can create the .env file that react-native-dotenv needs

set -euo pipefail

echo "Creating .env file from EAS environment variables..."

# Create .env file with the environment variables
cat > .env << EOF
SEND_GOAL_API_URL=${SEND_GOAL_API_URL:-}
UPLOAD_TOKEN=${UPLOAD_TOKEN:-}
EOF

echo ".env file created successfully"
echo "SEND_GOAL_API_URL is set: $([ -n "${SEND_GOAL_API_URL:-}" ] && echo "yes" || echo "no")"
echo "UPLOAD_TOKEN is set: $([ -n "${UPLOAD_TOKEN:-}" ] && echo "yes" || echo "no")"

