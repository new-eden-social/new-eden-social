FROM node:lts-alpine as base

# For building native dependencies
RUN apk add --no-cache make gcc g++ python

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn global add lerna typescript

ADD . .

RUN yarn bootstrap:prod
