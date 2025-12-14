#!/bin/bash
cd ../filestorage

echo "Pulling latest changes..."
git pull

echo "Stopping existing container..."
docker stop filestorage || true
docker rm filestorage || true

echo "Building new image..."
docker build -t filestorage .

echo "Starting container..."
docker run -d -p 18888:8888 --name filestorage filestorage
