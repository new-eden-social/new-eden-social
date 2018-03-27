import { Component, Inject } from '@nestjs/common';
import { UNIVERSE_TYPE_REPOSITORY_TOKEN } from './type.constants';
import { UniverseType } from './type.entity';
import { ESIService } from '../../core/external/esi/esi.service';
import { ESIEntetyNotFoundException } from '../../core/external/esi/esi.exceptions';
import { UniverseGroupService } from '../group/group.service';
import { UniverseTypeRepository } from './type.repository';

@Component()
export class UniverseTypeService {

  constructor(
    private esiService: ESIService,
    private groupService: UniverseGroupService,
    @Inject(UNIVERSE_TYPE_REPOSITORY_TOKEN)
    private typeRepository: UniverseTypeRepository,
  ) {
  }

  /**
   * Get type data
   * @param id
   * @return {Promise<UniverseType>}
   */
  public async get(id: number): Promise<UniverseType> {
    return this.findTypeById(id);
  }

  /**
   * Check if entity by id exists
   * @param {number} id
   * @return {Promise<Boolean>}
   */
  public async exists(id: number): Promise<Boolean> {
    try {
      await this.get(id);
    } catch (err) {
      if (err instanceof ESIEntetyNotFoundException) return false;
      throw err;
    }
    return true;
  }

  /**
   * Find UniverseCategory in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<UniverseType>}
   */
  private async findTypeById(id: number): Promise<UniverseType> {
    const foundType = await this.typeRepository.findOneById(id);

    if (foundType) return foundType;

    // If type not in DB, load it from ESI
    const type = new UniverseType();
    type.id = id;

    const esiType = await this.esiService.universeType(id);
    type.populateESI(esiType);

    type.group = await this.groupService.get(esiType.group_id);

    await this.typeRepository.save(type);

    return type;
  }
}
