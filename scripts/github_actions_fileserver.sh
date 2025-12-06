#!/bin/bash
cd ../filestorage

echo "Pulling latest changes..."
git pull

echo "Stopping existing container..."
docker stop filestorage || true
docker rm filestorage || true

echo "Building new image..."
sudo docker build -t filestorage .

echo "Starting container..."
sudo docker run -d -p 18000:8000 filestorage
sudo docker run -d -p 8000:8000 --name filestorage filestorage
