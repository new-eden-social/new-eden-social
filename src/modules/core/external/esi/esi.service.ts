import { Injectable, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  Categories,
  IGetAlliance,
  IGetCharacter,
  IGetCharacterPortrait,
  IGetCharacterRoles,
  IGetCorporation,
  ISearch,
  IUniverseCategory,
  IUniverseGroup, IUniverseName,
  IUniverseType,
  IGetStatus,
} from './esi.interface';
import { ESIEntetyNotFoundException } from './esi.exceptions';
import { RequestContext } from '../../requestContext/requestContext';
import { LoggerService } from '../../logger/logger.service';
import {fromPromise} from 'rxjs/internal-compatibility';
import { retry } from 'rxjs/internal/operators';

@Injectable()
export class ESIService {

  private static baseUrl = process.env.ESI_ENDPOINT;
  private static version = 'latest';
  private static userAgent = `eve-book/${process.env.npm_package_version}`
    + ` https://github.com/evebook/api`;
  private client: AxiosInstance;

  constructor(
    private loggerService: LoggerService,
  ) {
    this.client = axios.create({
      baseURL: `${ESIService.baseUrl}/${ESIService.version}`,
      headers: {
        'User-Agent': ESIService.userAgent,
        Accept: 'application/json',
      },
    });
  }

  /**
   * Get ESI Status
   * @param query
   * @return {Promise<ISearch>}
   * @url https://esi.evetech.net/ui/#/Status
   */
  public async status(): Promise<IGetStatus> {
    return this.request<IGetStatus>({
      url: 'status/',
      method: 'GET',
    });
  }

  /**
   * Search for alliances, characters, corporations
   * @param query
   * @return {Promise<ISearch>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Search/get_search
   */
  public async search(query: string): Promise<ISearch> {
    return this.request<ISearch>({
      url: 'search/',
      method: 'GET',
      params: {
        categories: [Categories.alliance, Categories.character, Categories.corporation].join(','),
        search: query,
      },
    });
  }

  /**
   * Get universe names for ids
   * @param {number[]} ids
   * @returns {Promise<IUniverseNames>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Universe/post_universe_names
   */
  public async universeNames(ids: number[]): Promise<IUniverseName[]> {
    return this.request<IUniverseName[]>({
      url: 'universe/names/',
      method: 'POST',
      data: ids,
    });
  }

  /**
   * Get universe event by id
   * @param {number} id
   * @returns {Promise<IUniverseType>}
   */
  public async universeType(id: number): Promise<IUniverseType> {
    return this.request<IUniverseType>({
      url: `universe/types/${id}`,
      method: 'GET',
    });
  }

  /**
   * Get universe group by id
   * @param {number} id
   * @returns {Promise<IUniverseGroup>}
   */
  public async universeGroup(id: number): Promise<IUniverseGroup> {
    return this.request<IUniverseGroup>({
      url: `universe/groups/${id}`,
      method: 'GET',
    });
  }

  /**
   * Get universe category by id
   * @param {number} id
   * @returns {Promise<IUniverseCategory>}
   */
  public async universeCategory(id: number): Promise<IUniverseCategory> {
    return this.request<IUniverseCategory>({
      url: `universe/categories/${id}`,
      method: 'GET',
    });
  }

  /**
   * Get character by id
   * @param id
   * @return {Promise<IGetCharacter>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id
   */
  public async getCharacter(id: number): Promise<IGetCharacter> {
    return this.request<IGetCharacter>({
      url: `characters/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get character portrait
   * @param id
   * @return {Promise<IGetCharacterPortrait>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_portrait
   */
  public async getCharacterPortrait(id: number): Promise<IGetCharacterPortrait> {
    return this.request<IGetCharacterPortrait>({
      url: `characters/${id}/portrait/`,
      method: 'GET',
    });
  }

  /**
   * Get character roles
   * @param {number} id
   * @return {Promise<IGetCorporation>}
   * @authenticated
   * @url https://esi.tech.ccp.is/ui/#/operations/Character/get_characters_character_id_roles
   */
  public async getCharacterRoles(id: number): Promise<IGetCharacterRoles> {
    return this.request<IGetCharacterRoles>({
      url: `characters/${id}/roles/`,
      method: 'GET',
    });
  }

  /**
   * Get corporation by id
   * @param id
   * @return {Promise<IGetCorporation>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Corporation/get_corporations_corporation_id
   */
  public async getCorporation(id: number): Promise<IGetCorporation> {
    return this.request<IGetCorporation>({
      url: `corporations/${id}/`,
      method: 'GET',
    });
  }

  /**
   * Get alliance by id
   * @param {number} id
   * @returns {Promise<IGetAlliance>}
   * @url https://esi.tech.ccp.is/ui/#/operations/Alliance/get_alliances_alliance_id
   */
  public async getAlliance(id: number): Promise<IGetAlliance> {
    return this.request<IGetAlliance>({
      url: `alliances/${id}`,
      method: 'GET',
    });
  }

  /**
   * Request wrapper
   * @param config
   * @return {Promise<T>}
   */
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const token = RequestContext.currentToken();

    if (!config.headers) config.headers = {};

    // If token is provided, send request with token.
    if (token) config.headers = Object.assign(config.headers, { Authorization: `Bearer ${token}` });

    this.loggerService.silly('ESI Request', config);

    try {
      const response = await fromPromise(this.client.request(config))
      .pipe(
        retry(3),
      ).toPromise();

      this.loggerService.silly('ESI Response', response.data);

      return response.data;
    } catch (err) {
      this.loggerService.warning('ESI Error', err);
      /**
       * Transform underlying request exceptions to ESI Exceptions
       */
      if (err.response && err.response.status === HttpStatus.NOT_FOUND) {
        throw new ESIEntetyNotFoundException();
      }
      else throw err;
    }

  }

}
