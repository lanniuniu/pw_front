git pull origin master;
docker stop pw_front pw_back mongo_spirits;
docker rm pw_front;
docker build -t pw_front .;
docker run --network=pw_network -p 80:52199 -itd -v /etc/localtime:/etc/localtime --name pw_front pw_front:latest;
docker image prune -f; # f不用确认
docker start mongo_spirits pw_back pw_front