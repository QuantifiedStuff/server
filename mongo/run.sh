if [ "$1" == "-rm" ]; then
    docker rm -f qs-mongo
fi

#pwd

docker build -t quantifiedstuff/mongo .
docker run --name qs-mongo --volumes-from qs-mongo-data -d quantifiedstuff/mongo
