FROM node:lts-alpine as builder

RUN apk --no-cache add curl

WORKDIR /suveyvore

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
COPY public public
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY src src

# Génère le dossier node_modules
RUN npm i

# Génère le dossier .next
RUN npm run build 

FROM node:lts-alpine

WORKDIR /suveyvore

# Copier les dossiers à partir de l'image précédente
COPY --from=builder /suveyvore/package.json /suveyvore/package.json
COPY --from=builder /suveyvore/public /suveyvore/public
COPY --from=builder /suveyvore/.next /suveyvore/.next

RUN npm i --production

CMD npm start