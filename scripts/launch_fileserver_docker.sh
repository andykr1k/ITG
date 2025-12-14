cd ../filestorage
docker stop filestorage || true
docker rm filestorage|| true
docker build -t filestorage .
docker run -d -p 18888:8888 filestorage
cd ../scripts
