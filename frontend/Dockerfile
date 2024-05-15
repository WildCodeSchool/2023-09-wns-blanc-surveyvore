FROM node:lts-alpine

RUN apk --no-cache add curl
WORKDIR /surveyvore

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY public public
COPY next-env.d.ts next-env.d.ts
COPY next.config.mjs next.config.mjs

RUN npm i

COPY src src

CMD npm start