FROM node:lts-alpine AS builder

WORKDIR /surveyvore

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY migrations migrations
COPY src src

RUN npm i

RUN npm run build

FROM node:lts-alpine

WORKDIR /surveyvore

COPY --from=builder /surveyvore/package.json /surveyvore/package.json
COPY --from=builder /surveyvore/package-lock.json /surveyvore/package-lock.json
COPY --from=builder /surveyvore/build /surveyvore

RUN npm i --production

CMD npx typeorm migration:run -d ./src/config/db.js ; npm start