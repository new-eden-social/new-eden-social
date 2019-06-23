export class UnauthenticatedException extends Error {
  constructor() {
    super('Unauthenticated');
  }
}

export class TokenExpiredException extends Error {
  constructor() {
    super('Token Expired');
  }
}
