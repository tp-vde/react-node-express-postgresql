import winston from 'winston';

export const loggerService = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; 
          })
        ),
      }),
    ],
  });

  return logger;
};
