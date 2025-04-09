import cors, { CorsOptions } from 'cors';
import { fileConfig } from '../config/paths.js';
import { ConfigReader } from '../config/ConfigReader.js';
import { RequestHandler } from 'express';
import { JsonObject } from '../config/types.js';
import session from 'express-session';

export function corsMiddleware(): RequestHandler {
  const config = new ConfigReader(fileConfig());
  const corsOptions: CorsOptions = config?.getOptional('backend.cors') as JsonObject;
  return cors(corsOptions);
};


export function sessionMiddleware(): RequestHandler {;
  return session({
    secret: 'votre_secret_securise',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true , //process.env.NODE_ENV === 'production',
      // domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'votredomaine.com',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
      sameSite: 'strict' // Protection contre les attaques CSRF
    }
  });
};