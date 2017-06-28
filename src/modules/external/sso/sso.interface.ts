declare module SSO {

  interface IAuthenticationResponse {
    readonly access_token: string;
    readonly token_type: string;
    readonly expires_in: string;
    readonly refresh_token: string;
  }

  interface IAuthenticationVerify {
    readonly CharacterID: number,
    readonly CharacterName: string,
    readonly ExpiresOn: Date,
    readonly Scopes: string,
    readonly TokenType: string,
    readonly CharacterOwnerHash: string
  }

}

export = SSO;
