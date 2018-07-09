FROM node:carbon-alpine
 
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

# Set dependencies path
ENV PATH /app/node_modules/.bin:$PATH

# Dependencies
RUN yarn install
# Global Dependencies
RUN yarn global add nodemon ts-node typescript

# Create seperate folder for code source
RUN mkdir /app/src
WORKDIR /app/src

# Copy app source
COPY . .

# Build app
RUN yarn build && mv dist /app/dist

CMD [ "/app/dist/api.js" ]
