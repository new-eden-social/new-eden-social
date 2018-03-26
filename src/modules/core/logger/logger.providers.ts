import { LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { Logger, transports } from 'winston';


export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = process.env.LOG_LEVEL;

      const winstonTransports = [
        new transports.Console({
          colorize: true,
          align: true,
        }),
      ];

      return new Logger({
        level: LOG_LEVEL,
        transports: winstonTransports,
      });
    },
  },
];
