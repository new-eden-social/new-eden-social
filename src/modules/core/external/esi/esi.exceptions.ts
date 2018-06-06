export class ESIException extends Error {
  constructor(...args) {
    super(...args);
  }
}

export class ESIEntetyNotFoundException extends ESIException {
  constructor() {
    super('Entety doesn\'t exists');
  }
}
