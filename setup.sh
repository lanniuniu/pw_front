git pull origin master;
docker stop pw_front;
docker rm pw_front;
docker build -t pw_front .;
docker run -p 80:52199 -d -v /etc/localtime:/etc/localtime --name pw_front pw_front:latest;
docker image prune -f; # f不用确认