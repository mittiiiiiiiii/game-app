FROM node:latest

WORKDIR /api

COPY ./package*.json ./

RUN yarn install

COPY ./api ./api

EXPOSE 3001

CMD ["node", "api/server.js"]
