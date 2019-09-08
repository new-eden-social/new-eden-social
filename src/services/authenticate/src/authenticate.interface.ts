export interface JWTPayload {
  ssoToken: string;
  ssoRefreshToken: string;
  characterId: number;
}