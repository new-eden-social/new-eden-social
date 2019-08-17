FROM newedensocial/base as build-env

WORKDIR /app/src/services/follow

ADD . .
RUN yarn build:dist

CMD [ "node", "dist/server.js" ]

# # Production image
# FROM gcr.io/distroless/nodejs as prod
# COPY --from=build-env /app/src/api/dist /app
# WORKDIR /app
# CMD ["api.js"]
