"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_constants_1 = require("./logger.constants");
const winston_1 = require("winston");
const logform_1 = require("logform");
exports.loggerProviders = [
    {
        provide: logger_constants_1.LOGGER_WINSTON_PROVIDER,
        useFactory: () => {
            const LOG_LEVEL = process.env.LOG_LEVEL;
            let output = logform_1.format.json();
            if (process.env.NODE_ENV === 'develop') {
                output = logform_1.format.combine(logform_1.format.colorize(), logform_1.format.printf((nfo) => {
                    let output = `${nfo.timestamp} ${nfo.level}: ${nfo.message}`;
                    if (nfo.metadata && Object.keys(nfo.metadata).length !== 0) {
                        output += `\n${JSON.stringify(nfo.metadata, null, 4)}`;
                    }
                    return output;
                }));
            }
            return winston_1.createLogger({
                level: LOG_LEVEL,
                format: logform_1.format.combine(logform_1.format.metadata(), logform_1.format.timestamp(), output),
                transports: [
                    new winston_1.transports.Console(),
                ],
            });
        },
    },
];
//# sourceMappingURL=logger.providers.js.map