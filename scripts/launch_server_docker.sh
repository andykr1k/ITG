cd ../server
docker stop server || true
docker rm server || true
docker build -t server .
docker run -d -p 18000:8000 server
cd ../scripts
