import { ESIService, IUniverseName } from '@new-eden-social/esi';
export declare class SearchService {
    private readonly esiService;
    constructor(esiService: ESIService);
    search(query: string): Promise<IUniverseName[]>;
}
