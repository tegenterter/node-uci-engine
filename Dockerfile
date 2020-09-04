FROM node:12

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci

COPY . /usr/src/app

RUN npm run build --loglevel error
