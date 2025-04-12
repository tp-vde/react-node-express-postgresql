import dotenv from 'dotenv';
dotenv.config();

/**
 *  A déplacer dans app-config.yaml
 */
export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
