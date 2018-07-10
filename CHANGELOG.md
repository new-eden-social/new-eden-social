# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.0"></a>
# 0.1.0 (2018-07-10)


* Project structure like lynx #91 (#94) ([b5e0450](https://github.com/evebook/api/commit/b5e0450)), closes [#91](https://github.com/evebook/api/issues/91) [#94](https://github.com/evebook/api/issues/94) [#91](https://github.com/evebook/api/issues/91)


### Bug Fixes

* **alliance:** missing handle on allince dtos ([ea769c2](https://github.com/evebook/api/commit/ea769c2))
* **docs:** fix Bearer Auth header name ([d99c335](https://github.com/evebook/api/commit/d99c335))
* **package:** update [@types](https://github.com/types)/ws to version 4.0.0 ([#71](https://github.com/evebook/api/issues/71)) ([6246e05](https://github.com/evebook/api/commit/6246e05))
* **package:** update [@types](https://github.com/types)/ws to version 5.1.0 ([#104](https://github.com/evebook/api/issues/104)) ([6cc8b29](https://github.com/evebook/api/commit/6cc8b29))
* **package:** update axios to version 0.17.0 ([#56](https://github.com/evebook/api/issues/56)) ([35dc057](https://github.com/evebook/api/commit/35dc057))
* **package:** update axios to version 0.18.0 ([#89](https://github.com/evebook/api/issues/89)) ([0d3c9b3](https://github.com/evebook/api/commit/0d3c9b3))
* **package:** update class-validator to version 0.8.0 ([#85](https://github.com/evebook/api/issues/85)) ([747358a](https://github.com/evebook/api/commit/747358a))
* **package:** update dotenv to version 5.0.0 ([#87](https://github.com/evebook/api/issues/87)) ([140c9cc](https://github.com/evebook/api/commit/140c9cc))
* **package:** update dotenv to version 6.0.0 ([#112](https://github.com/evebook/api/issues/112)) ([ef9834e](https://github.com/evebook/api/commit/ef9834e))
* **package:** update pg to version 7.0.0 ([#17](https://github.com/evebook/api/issues/17)) ([550ec43](https://github.com/evebook/api/commit/550ec43))
* **package:** update typeorm to version 0.1.0-alpha.21 ([883f3e1](https://github.com/evebook/api/commit/883f3e1))
* **package:** update typeorm to version 0.1.0-alpha.27 ([da6025d](https://github.com/evebook/api/commit/da6025d))
* logger upgrade issue ([ed6b368](https://github.com/evebook/api/commit/ed6b368))
* **package:** update typeorm to version 0.1.0-alpha.22 ([f7b3663](https://github.com/evebook/api/commit/f7b3663))
* **package:** update typeorm to version 0.1.0-alpha.23 ([58d1ec9](https://github.com/evebook/api/commit/58d1ec9))
* **package:** update typeorm to version 0.1.0-alpha.24 ([5c8fe64](https://github.com/evebook/api/commit/5c8fe64))
* **package:** update typeorm to version 0.1.0-alpha.25 ([1ddfbdf](https://github.com/evebook/api/commit/1ddfbdf))
* **package:** update typeorm to version 0.1.0-alpha.26 ([d975868](https://github.com/evebook/api/commit/d975868))
* **package:** update typeorm to version 0.1.0-alpha.35 ([#24](https://github.com/evebook/api/issues/24)) ([f276950](https://github.com/evebook/api/commit/f276950))
* **package:** update ws to version 4.0.0 ([#69](https://github.com/evebook/api/issues/69)) ([b7a00c2](https://github.com/evebook/api/commit/b7a00c2))
* remove KillmailModule from AppModule ([2d91d76](https://github.com/evebook/api/commit/2d91d76))
* **package:** update ws to version 5.0.0 ([#90](https://github.com/evebook/api/issues/90)) ([4c98ca0](https://github.com/evebook/api/commit/4c98ca0))
* **search:** response not being send ([b7c3bf4](https://github.com/evebook/api/commit/b7c3bf4))
* removed postman badge ([3d36ca7](https://github.com/evebook/api/commit/3d36ca7))
* typeorm version ([6304393](https://github.com/evebook/api/commit/6304393))


### Features

* **misc:** added handles to characters/corporations/alliances ([1cec6f4](https://github.com/evebook/api/commit/1cec6f4)), closes [#83](https://github.com/evebook/api/issues/83)


### BREAKING CHANGES

* creating posts is now done without wrapping data inside 'post:' but all data is
inside body

* feat(database): switched to using repositories for easier maintanance

* fix: fixed structure changes bugs
