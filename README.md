<h1 align="center">
  New Eden Social
</h1>

<h3 align="center">Hub for EVE Online community.</h3>

<div align="center">
  <a target="_blank" href="https://cloud.drone.io/new-eden-social/new-eden-social">
    <img src="https://cloud.drone.io/api/badges/new-eden-social/new-eden-social/status.svg" alt="Build Status" />
  </a>
  <a target="_blank" href="https://coveralls.io/github/new-eden-social/new-eden-social">
    <img src="https://coveralls.io/repos/github/new-eden-social/new-eden-social/badge.svg" alt="Coverage Status" />
  </a>
  <a target="_blank" href="https://www.fuzzwork.co.uk/tweetfleet-slack-invites/">
    <img src="https://img.shields.io/badge/slack-%23evebook-ff69b4.svg" alt="Join Slack Chat" />
  </a>
  <a target="_blank" href="https://liberapay.com/New-Eden-Social">
    <img alt="Liberapay receiving" src="https://img.shields.io/liberapay/receives/new-eden-social.svg"
    alt="Librepay Donations">
  </a>
</div>

## What's it about
Project was started with an idea of creating social platform for players of EVE Online. A place where players could connect and share their experiences, fan art, images, videos, thoughts, propaganda...

Each "user" would be an actual EVE Online character and you could only login using game's credentials (SSO), this way characters could interact outside of eve online. Alliances and corporations could share propaganda videos/art and gather followers who could re-share and spread the word.

Whole platform would heavily relay on EVE Online API, so that you could send in game emails, money, create events (calendar). It would feel as an extension of game itself.

Think of it as combination of r/eve and twitter. A hub of EVE Online community.

![Preview of New Eden Social](https://i.imgur.com/IqB7JK9.png)

### Releases
Branch `master` is automatically deployed on each commit/merge to development servers. Production servers are automaticly deployed
on each release (tag).

| Version        | API                             | WEB                       |Documentation                                               |
| -------------- | ------------------------------- | ------------------------- |------------------------------------------------------------|
| master branch  | api.development.neweden.social |development.neweden.social | [Development](http://api.development.neweden.social/docs) |
| latest release | api.neweden.social             |neweden.social            | [Release](http://api.neweden.social/docs)                 |

Changelog is located in [CHANGELOG.md](https://github.com/new-eden-social/hub/blob/master/CHANGELOG.md)

## Contribution
We welcome everyone that wants to contribute! You should read [CONTRIBUTING.md](/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) before you start. If you have any questions you can ask them on [issues](https://github.com/new-eden-social/new-eden-social/issues) or directly on [slack](https://www.fuzzwork.co.uk/tweetfleet-slack-invites/) in `#new-eden-social`.

## Progress tracking
Current state of what is being worked on, can be found in [this project](https://github.com/orgs/new-eden-social/projects/1).

## Packages
List of packages that can be re-used by 3th parties. They are written for NestJS framework, but in the future, there is plan to write them in platform agnostic way.

| Name                                                          | Description                            | NPM   |  
|---------------------------------------------------------------|----------------------------------------|-----------|
|[@new-eden-social/esi](/packages/esi)                          | ESI Client for NestJS                  |![npm](https://img.shields.io/npm/v/@new-eden-social/esi.svg)
|[@new-eden-social/eve-sso](/packages/eve-sso)                  | EVE SSO Client for NestJS              |![npm](https://img.shields.io/npm/v/@new-eden-social/eve-sso.svg)
|[@new-eden-social/zkillboard](/packages/zkillboard)            | ZKillboard Client for NestJS           |![npm](https://img.shields.io/npm/v/@new-eden-social/zkillboard.svg)
|[@new-eden-social/killmails-stream](/packages/killmails-stream)| ZKillboard KillStream Client for NestJS|![npm](https://img.shields.io/npm/v/@new-eden-social/killmails-stream.svg)
