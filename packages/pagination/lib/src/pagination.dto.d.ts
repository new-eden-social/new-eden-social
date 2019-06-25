export declare class DPagination<T> {
    data: T[];
    page: number;
    pages: number;
    perPage: number;
    count: number;
    constructor(data: T[], page: number, perPage: number, count: number);
}
