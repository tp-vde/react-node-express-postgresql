import cors, { CorsOptions } from 'cors';
import { fileConfig } from '../config/paths';
import { ConfigReader } from '../config/ConfigReader';
import { RequestHandler } from 'express';
import { JsonObject } from '../config/types';

export function corsMiddleware(): RequestHandler {
  const config = new ConfigReader(fileConfig());
  const corsOptions: CorsOptions = config?.getOptional('backend.cors') as JsonObject;
  return cors(corsOptions);
};