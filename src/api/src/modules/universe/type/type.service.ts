import { Injectable, Inject } from '@nestjs/common';
import { UniverseType } from './type.entity';
import { UniverseGroupService } from '../group/group.service';
import { UniverseTypeRepository } from './type.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ESIService, ESIEntetyNotFoundException } from '@new-eden-social/esi';

@Injectable()
export class UniverseTypeService {

  constructor(
    private esiService: ESIService,
    private groupService: UniverseGroupService,
    @InjectRepository(UniverseTypeRepository)
    private typeRepository: UniverseTypeRepository,
  ) {
  }

  /**
   * Get event data
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
    const foundType = await this.typeRepository.findOne(id);

    if (foundType) return foundType;

    // If event not in DB, load it from ESI
    const type = new UniverseType();
    type.id = id;

    const esiType = await this.esiService.universeType(id);
    type.populateESI(esiType);

    type.group = await this.groupService.get(esiType.group_id);

    await this.typeRepository.save(type);

    return type;
  }
}
