import { IKillmailRaw, IKillmail, IKillmailRawWithoutZKB, IAllianceStatistics, ICorporationStatistics, ICharacterStatistics } from './zkillboard.interface';
export declare class ZKillboardService {
    private baseUrl;
    private userAgent;
    private client;
    constructor();
    /**
     * Create Kill URL
     * @param {number} killId
     * @return {string}
     */
    static createKillUrl(killId: number): string;
    formatKillmail(raw: IKillmailRaw | IKillmailRawWithoutZKB, zkb: IKillmailRaw['zkb']): IKillmail;
    getKillmail(id: number): Promise<IKillmail>;
    /**
     * Get alliance statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICorporationStatistics>}
     */
    allianceStatistics(id: number): Promise<IAllianceStatistics>;
    /**
     * Get corporation statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICorporationStatistics>}
     */
    corporationStatistics(id: number): Promise<ICorporationStatistics>;
    /**
     * Get character statistics from zKillboard
     *
     * @param id
     * @return {Promise<ICharacterStatistics>}
     */
    characterStatistics(id: number): Promise<ICharacterStatistics>;
    /**
     * Request wrapper
     * @param config
     * @return {Promise<T>}
     */
    private request;
}
