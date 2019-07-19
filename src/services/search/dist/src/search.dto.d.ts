import { Categories, IUniverseName } from '@new-eden-social/esi';
export declare class DSearchName {
    id: number;
    name: string;
    category: Categories;
    constructor(name: IUniverseName);
}
export declare class DSearch {
    names: DSearchName[];
    constructor(names: IUniverseName[]);
}
