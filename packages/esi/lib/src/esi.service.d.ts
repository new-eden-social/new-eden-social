import { IGetAlliance, IGetCharacter, IGetCharacterPortrait, IGetCharacterRoles, IGetCorporation, ISearch, IUniverseCategory, IUniverseGroup, IUniverseName, IUniverseType, IGetStatus } from './esi.interface';
import { LoggerService } from '@new-eden-social/logger';
export declare class ESIService {
    private loggerService;
    private static baseUrl;
    private static version;
    private static userAgent;
    private client;
    constructor(loggerService: LoggerService);
    /**
     * Get ESI Status
     * @param query
     * @return {Promise<ISearch>}
     * @url https://esi.evetech.net/ui/#/Status
     */
    status(): Promise<IGetStatus>;
    /**
     * Search for alliances, characters, corporations
     * @param query
     * @return {Promise<ISearch>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Search/get_search
     */
    search(query: string): Promise<ISearch>;
    /**
     * Get universe names for ids
     * @param {number[]} ids
     * @returns {Promise<IUniverseNames>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Universe/post_universe_names
     */
    universeNames(ids: number[]): Promise<IUniverseName[]>;
    /**
     * Get universe event by id
     * @param {number} id
     * @returns {Promise<IUniverseType>}
     */
    universeType(id: number): Promise<IUniverseType>;
    /**
     * Get universe group by id
     * @param {number} id
     * @returns {Promise<IUniverseGroup>}
     */
    universeGroup(id: number): Promise<IUniverseGroup>;
    /**
     * Get universe category by id
     * @param {number} id
     * @returns {Promise<IUniverseCategory>}
     */
    universeCategory(id: number): Promise<IUniverseCategory>;
    /**
     * Get character by id
     * @param id
     * @return {Promise<IGetCharacter>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id
     */
    getCharacter(id: number): Promise<IGetCharacter>;
    /**
     * Get character portrait
     * @param id
     * @return {Promise<IGetCharacterPortrait>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_portrait
     */
    getCharacterPortrait(id: number): Promise<IGetCharacterPortrait>;
    /**
     * Get character roles
     * @param {number} id
     * @return {Promise<IGetCorporation>}
     * @authenticated
     * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_roles
     */
    getCharacterRoles(id: number): Promise<IGetCharacterRoles>;
    /**
     * Get corporation by id
     * @param id
     * @return {Promise<IGetCorporation>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Corporation/get_corporations_corporation_id
     */
    getCorporation(id: number): Promise<IGetCorporation>;
    /**
     * Get alliance by id
     * @param {number} id
     * @returns {Promise<IGetAlliance>}
     * @url https://esi.tech.ccp.is/ui/#/operations/Alliance/get_alliances_alliance_id
     */
    getAlliance(id: number): Promise<IGetAlliance>;
    /**
     * Request wrapper
     * @param config
     * @return {Promise<T>}
     */
    private request;
}
