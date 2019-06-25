import { IAuthenticationResponse, IAuthenticationVerify } from './evesso.interface';
export declare class EVESSOService {
    private baseUrl;
    private userAgent;
    private client;
    private authenticationRedirect;
    private clientId;
    private secretKey;
    private scope;
    constructor();
    /**
     * Get authentication url
     * @return {string}
     */
    readonly authenticationUrl: string;
    /**
     * Get authorization header for verifying authentication
     * @return {string}
     */
    private readonly authorizationHeader;
    /**
     * Get authentication access token
     * @param state
     * @param code
     * @return {Promise<IAuthenticationResponse>}
     */
    getAuthenticationToken(state: string, code: string): Promise<IAuthenticationResponse>;
    /**
     * Use refresh token to obtain new access token
     * @param refreshToken
     * @return {Promise<IAuthenticationResponse>}
     */
    refreshToken(refreshToken: string): Promise<IAuthenticationResponse>;
    /**
     * Use to check if token is valid
     * @param token
     * @return {Promise<IAuthenticationVerify>}
     */
    verifyAuthentication(token: string): Promise<IAuthenticationVerify>;
}
