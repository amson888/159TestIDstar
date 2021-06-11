FROM nikolaik/python-nodejs:python3.9-nodejs16-alpine

RUN apk update && apk add ca-certificates && update-ca-certificates

RUN mkdir /backend-coding-test
ADD . /backend-coding-test
WORKDIR /backend-coding-test

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

RUN npm install
RUN npm install -g nodemon
CMD /wait && npm run dev