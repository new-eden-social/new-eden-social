<h1 align="center">
  EVE Book API
</h1>

## Installation

```
# Using NPM
$ npm install

# Using Yarn
$ yarn

# Using Docker
$ docker-compose build
```

## Configuration
All configuration is done in `.env` file. You can create it by copying `example.env`. You can override `.env` file by providing envirement variables like `API_PORT=8080 yarn start`

```
$ cp example.env .env
```

## Start
Project consist of different services.

Main service is API, that serves all the data for web. Then we have Updater, which periodically updates characters/corporations/alliances with changing/live data. And Killmails, which is listening for new killmails that happen in game and creates appropriate posts/events.

### API
```
# Using NPM
$ npm run start

# Using Yarn
$ yarn start

# Using Docker
$ docker-compose up api
```

### Updater
```
# Using NPM
$ npm run start:updater

# Using Yarn
$ yarn start:updater

# Using Docker
$ docker-compose up updater
```

### Killmails
```
# Using NPM
$ npm run start:killmails

# Using Yarn
$ yarn start:killmails

# Using Docker
$ docker-compose up killmails
```
