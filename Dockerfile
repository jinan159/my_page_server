FROM node:14.16

ENV NODE_ENV dev_remote

EXPOSE 3000

RUN mkdir /app

WORKDIR /app

COPY ./ /app

RUN npm install