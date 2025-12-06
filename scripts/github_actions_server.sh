#!/bin/bash
cd ../server

echo "Pulling latest changes..."
git pull

echo "Stopping existing container..."
docker stop server || true
docker rm server || true

echo "Building new image..."
sudo docker build -t server .

echo "Starting container..."
sudo docker run -d -p 18000:8000 server
sudo docker run -d -p 8000:8000 --name server server
