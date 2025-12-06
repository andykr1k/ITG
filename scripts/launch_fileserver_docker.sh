cd ../filestorage
sudo docker build -t filestorage .
sudo docker run -d -p 18888:8888 filestorage
cd ../scripts
