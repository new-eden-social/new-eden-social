export class UnauthenticatedException extends Error {
  constructor() {
    super('Unauthenticated');
  }
}
