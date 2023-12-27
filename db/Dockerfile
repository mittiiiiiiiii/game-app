FROM node:latest

WORKDIR /db

COPY ./package*.json ./

RUN yarn install

COPY ./db ./db

EXPOSE 4000

CMD ["node", "db/server.js"]