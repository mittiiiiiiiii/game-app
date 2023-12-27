FROM node:latest

WORKDIR /app

COPY ./package*.json ./

RUN yarn install

COPY ./api/server ./api

EXPOSE 3001

CMD ["node", "api/server.js"]
