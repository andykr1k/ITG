#!/bin/bash
cd ../filestorage

echo "Pulling latest changes..."
git pull

echo "Stopping existing container..."
sudo docker stop filestorage || true
sudo docker rm filestorage || true

echo "Building new image..."
sudo docker build -t filestorage .

echo "Starting container..."
sudo docker run -d -p 18888:8888 --name filestorage filestorage
