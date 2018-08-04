import { Injectable, Inject } from '@nestjs/common';
import { UniverseCategory } from './category.entity';
import { ESIService } from '../../core/external/esi/esi.service';
import { ESIEntetyNotFoundException } from '../../core/external/esi/esi.exceptions';
import { UniverseCategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UniverseCategoryService {

  constructor(
    @InjectRepository(UniverseCategoryRepository)
    private categoryRepository: UniverseCategoryRepository,
    private esiService: ESIService,
  ) {
  }

  /**
   * Get category data
   * @param id
   * @return {Promise<UniverseCategory>}
   */
  public async get(id: number): Promise<UniverseCategory> {
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
   * @return {Promise<UniverseCategory>}
   */
  private async findTypeById(id: number): Promise<UniverseCategory> {
    const foundCategory = await this.categoryRepository.findOne(id);

    if (foundCategory) return foundCategory;

    // If category not in DB, load it from ESI
    const category = new UniverseCategory();
    category.id = id;

    const esiCategory = await this.esiService.universeCategory(id);
    category.populateESI(esiCategory);
    await this.categoryRepository.save(category);

    return category;
  }
}
