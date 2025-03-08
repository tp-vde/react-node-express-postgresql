import winston from "winston";

export interface UserRow {
  id?: number;
  code: string;
  name: string;
  first_name: string;
  email: string;
  phone: string;
  speciality: string;
  entry_at: Date | string;
  first_departure_mission_at?: Date | string;
  created_at?: Date | string;
};

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


export function formatDate(nwdate: Date) {
  const   date = new Date(nwdate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}