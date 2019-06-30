FROM node:lts-alpine as base

# For building native dependencies
RUN apk add --no-cache make gcc g++ python

WORKDIR /app

ADD . .

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn global add lerna
RUN yarn bootstrap:prod
