if [ "$1" == "-rm" ]; then
    docker rm -f qs-api
fi

#pwd

docker build -t quantifiedstuff/api .
docker run -p 8002:8002 --name qs-api --link qs-mongo:db -d quantifiedstuff/api
