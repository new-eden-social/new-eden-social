FROM node:lts-alpine as build-env
 
# For building native dependencies
RUN apk add --no-cache make gcc g++ python

# App root
# /app
#    |- node_modules (dependencies)
#    |- src (app sources)
#
WORKDIR /app

# Needed to install dependencies
COPY package.json /app
COPY yarn.lock /app

# Set dependencies path
ENV PATH /app/node_modules/.bin:$PATH

# Dependencies
RUN yarn install --frozen-lockfile
# Global Dependencies
RUN yarn global add typescript nodemon ts-node

# Copy app source
COPY . .

# Build app
RUN yarn build

# Production image
FROM gcr.io/distroless/nodejs as prod
COPY --from=build-env /app/dist /app
WORKDIR /app
CMD ["api.js"]
