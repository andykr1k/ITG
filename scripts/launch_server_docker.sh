cd ../server
docker stop server || true
docker rm server || true
sudo docker build -t server .
sudo docker run -d -p 18000:8000 server
cd ../scripts
