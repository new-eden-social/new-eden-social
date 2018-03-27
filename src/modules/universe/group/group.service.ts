import { Component, Inject } from '@nestjs/common';
import { UNIVERSE_GROUP_REPOSITORY_TOKEN } from './group.constants';
import { UniverseGroup } from './group.entity';
import { ESIService } from '../../core/external/esi/esi.service';
import { ESIEntetyNotFoundException } from '../../core/external/esi/esi.exceptions';
import { UniverseCategoryService } from '../category/category.service';
import { UniverseGroupRepository } from './group.repository';

@Component()
export class UniverseGroupService {

  constructor(
    private esiService: ESIService,
    private universeCategoryService: UniverseCategoryService,
    @Inject(UNIVERSE_GROUP_REPOSITORY_TOKEN)
    private groupRepository: UniverseGroupRepository,
  ) {
  }

  /**
   * Get group data
   * @param id
   * @return {Promise<UniverseGroup>}
   */
  public async get(id: number): Promise<UniverseGroup> {
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
   * @return {Promise<UniverseGroup>}
   */
  private async findTypeById(id: number): Promise<UniverseGroup> {
    const foundGroup = await this.groupRepository.findOneById(id);

    if (foundGroup) return foundGroup;

    // If group not in DB, load it from ESI
    const group = new UniverseGroup();
    group.id = id;

    const esiGroup = await this.esiService.universeGroup(id);
    group.populateESI(esiGroup);

    group.category = await this.universeCategoryService.get(esiGroup.category_id);

    // FIXME: Nekak se category ne nastavi prav
    await this.groupRepository.save(group);

    return group;
  }
}
