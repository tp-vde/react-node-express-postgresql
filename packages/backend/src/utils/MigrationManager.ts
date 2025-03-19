import knex, { Knex } from 'knex';
import config from "./knexConnect";
import logger from '../utils/logger';



export default class MigrationManager {
  private readonly dbName: string;
  private readonly knexInstance: Knex;

  constructor(options: {dbName: string}  ) {
    this.dbName = options.dbName;
    this.knexInstance = knex(config.development);
  }

  public async createDatabaseIfNotExists(): Promise<void> {
    const dbExists = await this.knexInstance.raw(
      `SELECT 1 FROM pg_database WHERE datname = ?`,
      [this.dbName]
    );

    if (dbExists.rowCount === 0) {
      await this.knexInstance.raw(`CREATE DATABASE ??`, [this.dbName]);
      logger.info(`La database '${this.dbName}' a été créée`);
    } else {
      logger.info(`Database ${this.dbName} already exists.`);
    }
  }

  public async migrate(): Promise<void> {
    const knexCnx = knex({
      ...config.development,
      client: 'pg',
      connection: {
        ...(config.development.connection as object), 
        database: this.dbName, 
        password: 'password'
      },
    });

    await knexCnx.migrate.latest();
    await knexCnx.destroy();
    logger.info('Migrations run successfully.');
  }

  async close() {
    await this.knexInstance.destroy();
    logger.info('Connection closed.');
  }

  async rollback() {
    await this.knexInstance.migrate.rollback();
    logger.info('Migrations rolled back.');
  }

};

