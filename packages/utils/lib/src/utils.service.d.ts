export declare class UtilsService {
    private hashids;
    constructor();
    /**
     * Create hash from parameters
     * @param args
     * @return {Promise<string>}
     */
    hash(...args: any[]): Promise<string>;
    /**
     * Encode Hashids from values
     * @param args
     * @return {string}
     */
    hashidsEncode(...args: number[]): string;
    /**
     * Decode Hashids from value
     * @param hash
     * @return {string}
     */
    hashidsDecode(hash: string): number[];
    /**
     * Create handle for id and name combination
     * @param id
     * @param name
     * @return {string}
     */
    createHandle(id: any, name: any): string;
}
