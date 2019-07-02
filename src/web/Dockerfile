FROM newedensocial/base as build-env

WORKDIR /app/src/web

ADD . .

ENV PATH /app/src/web/node_modules/.bin:$PATH

RUN yarn run prebuild
RUN yarn run build:ssr

CMD [ "node", "dist/server.js"]

# Production image
#FROM gcr.io/distroless/nodejs as prod
#COPY --from=build-env /app/src/web/dist /app
#WORKDIR /app
#CMD ["server.js"]
