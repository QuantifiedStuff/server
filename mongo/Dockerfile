FROM debian:wheezy
MAINTAINER Quantified Stuff "brian@quantifiedstuff.com"
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main' | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update && apt-get install -y adduser perl mongodb-org
RUN mkdir -p /data/db
VOLUME ["/data"]
EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod"]
CMD ["--port", "27017"]
