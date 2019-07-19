import { SearchService } from './search.service';
import { DSearch } from './search.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string): Promise<DSearch>;
}
