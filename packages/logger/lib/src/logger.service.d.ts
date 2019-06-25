import { LOGGER_LEVEL } from './logger.constants';
import { Logger } from 'winston';
export declare class LoggerService {
    private logger;
    constructor(logger: Logger);
    log(level: LOGGER_LEVEL, msg: string, ...meta: any[]): void;
    debug(msg: string, ...meta: any[]): void;
    error(msg: string, ...meta: any[]): void;
    warning(msg: string, ...meta: any[]): void;
    info(msg: string, ...meta: any[]): void;
    silly(msg: string, ...meta: any[]): void;
}
