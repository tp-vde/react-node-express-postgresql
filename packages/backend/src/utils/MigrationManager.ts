import knex, { Knex } from 'knex';
import config from "./knexConnect";


export class MigrationManager {
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
      console.log(`Database ${this.dbName} created.`);
    } else {
      console.log(`Database ${this.dbName} already exists.`);
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
    console.log('Migrations run successfully.');
  }

  async close() {
    await this.knexInstance.destroy();
    console.log('Connection closed.');
  }

  async rollback() {
    await this.knexInstance.migrate.rollback();
    console.log('Migrations rolled back.');
  }

}

