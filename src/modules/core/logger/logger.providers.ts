import { LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { transports, createLogger } from 'winston';
import { format } from 'logform';

export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = process.env.LOG_LEVEL;

      return createLogger({
        level: LOG_LEVEL,
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf((nfo) => {
            return `${nfo.timestamp} ${nfo.level}: ${nfo.message}`;
          }),
        ),
        transports: [
          new transports.Console(),
        ],
      });
    },
  },
];
