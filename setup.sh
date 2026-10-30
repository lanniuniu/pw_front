git pull origin master;
docker stop pw_front pw_nginx 2>/dev/null;
docker rm pw_front pw_nginx 2>/dev/null;
docker build -t pw_front .;
docker run --network=pw_network -itd -v /etc/localtime:/etc/localtime --name pw_front pw_front:latest;
docker run --network=pw_network -p 80:52199 -itd -v /etc/localtime:/etc/localtime --name pw_nginx nginx:1.14.0;
docker cp nginx.conf pw_nginx:/etc/nginx/nginx.conf;
docker restart pw_nginx;
docker image prune -f; # f不用确认
docker start mongo_spirits pw_back pw_front pw_nginx