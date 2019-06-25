export declare const loggerProviders: {
    provide: string;
    useFactory: () => import("winston").Logger;
}[];
