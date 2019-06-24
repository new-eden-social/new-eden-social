import { IKillmailStreamRaw } from './killmails-stream.interface';
import { ZKillboardService, IKillmail } from '@new-eden-social/zkillboard';
export declare class KillmailsStreamService {
    private zkillboardService;
    private baseUrl;
    private userAgent;
    private client;
    constructor(zkillboardService: ZKillboardService);
    /**
     * Emmit formatted/standardised killmail
     * @param callback
     */
    subscribe(callback: (data: IKillmail) => void): void;
    /**
     * Emmit raw killmail data
     * @param callback
     */
    subscribeRaw(callback: (data: IKillmailStreamRaw) => void): void;
}
