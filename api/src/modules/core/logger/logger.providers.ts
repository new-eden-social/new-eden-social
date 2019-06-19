import { LOGGER_WINSTON_PROVIDER } from './logger.constants';
import { transports, createLogger } from 'winston';
import { format, TransformableInfo } from 'logform';

export const loggerProviders = [
  {
    provide: LOGGER_WINSTON_PROVIDER,
    useFactory: () => {
      const LOG_LEVEL = process.env.LOG_LEVEL;

      let output = format.json();
      if (process.env.NODE_ENV === 'develop') {
        output = format.combine(
          format.colorize(),
          format.printf((nfo: TransformableInfo) => {
            let output = `${nfo.timestamp} ${nfo.level}: ${nfo.message}`;
            if (nfo.metadata && Object.keys(nfo.metadata).length !== 0) {
              output += `\n${JSON.stringify(nfo.metadata, null, 4)}`;
            }
            return output;
          }),
        );
      }

      return createLogger({
        level: LOG_LEVEL,
        format: format.combine(
          format.metadata(),
          format.timestamp(),
          output,
        ),
        transports: [
          new transports.Console(),
        ],
      });
    },
  },
];
