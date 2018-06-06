import { Injectable } from '@nestjs/common';
import { UniverseLocation } from './location.entity';
import { ESIService } from '../../core/external/esi/esi.service';
import { ESIEntetyNotFoundException } from '../../core/external/esi/esi.exceptions';
import { Categories } from '../../core/external/esi/esi.interface';
import { UniverseLocationRepository } from './location.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UniverseLocationService {

  constructor(
    private esiService: ESIService,
    @InjectRepository(UniverseLocationRepository)
    private locationRepository: UniverseLocationRepository,
  ) {
  }

  /**
   * Get location data
   * @param id
   * @return {Promise<UniverseLocation>}
   */
  public async get(id: number): Promise<UniverseLocation> {
    return this.findLocationById(id);
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
   * Find location in db. If it doesn't exists, create it.
   * @param {number} id
   * @return {Promise<UniverseLocation>}
   */
  private async findLocationById(id: number): Promise<UniverseLocation> {
    const foundLocation = await this.locationRepository.findOne(id);

    if (foundLocation) return foundLocation;

    // If location not in DB, load it from ESI
    const location = new UniverseLocation();
    location.id = id;

    const universeNames = await this.esiService.universeNames([id]);
    // Filter found universe properties for id, we only want space locations
    const esiLocation = universeNames.find(({ category }) =>
      category === Categories.station ||
      category === Categories.solar_system ||
      category === Categories.region ||
      category === Categories.constellation);
    // If location not found, throw error
    // TODO: Replace with proper LocationNotFoundException #74
    if (!esiLocation) throw new ESIEntetyNotFoundException();

    location.populateESI(esiLocation);
    await this.locationRepository.save(location);

    return location;
  }
}
