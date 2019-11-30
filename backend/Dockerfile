FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install \
    && apk del .gyp

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]