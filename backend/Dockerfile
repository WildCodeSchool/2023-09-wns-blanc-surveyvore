FROM node:lts-alpine

RUN mkdir /surveyvore
WORKDIR /surveyvore
COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY .env .env
RUN npm i
COPY src src

CMD npm start