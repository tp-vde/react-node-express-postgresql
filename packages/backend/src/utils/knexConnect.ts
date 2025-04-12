import { Knex } from "knex";
import { ConfigReader } from "../config/ConfigReader.js";
import { fileConfig } from "../config/paths.js";

const configBase = new ConfigReader(fileConfig());
const databaseConfig = configBase.getOptional('backend.database');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: { [key: string]: Knex.Config } = {
  development: databaseConfig as Knex.Config<any>,
  production: {
    client: 'pg',
    connection: {
      user: 'user',
      password: 'password',
      database: 'postgres',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
export default config;