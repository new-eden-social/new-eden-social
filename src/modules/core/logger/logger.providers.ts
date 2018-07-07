import { LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { transports, createLogger } from 'winston';

export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = process.env.LOG_LEVEL;

      const winstonTransports = [
        new transports.Console({}),
      ];

      return createLogger({
        level: LOG_LEVEL,
        transports: winstonTransports,
      });
    },
  },
];
