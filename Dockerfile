FROM node:alpine

WORKDIR /api

COPY . . 

RUN yarn install --network-timeout=1000000

RUN yarn build

ENV LOCAL=false
ENV TZ=America/Sao_Paulo

CMD ["node", "dist/main.js"]