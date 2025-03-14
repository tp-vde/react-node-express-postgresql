import MigrationManager from './utils/MigrationManager';
import express from 'express';
import { createRouter } from './routes/router';
import { ConfigReader } from "./config/ConfigReader";
import { fileConfig } from "./config/paths";
import { readHttpServerOptions } from "./config/hostConfig";
import { loggerService } from "./types/types";
import bodyParser from 'body-parser';


const config = new ConfigReader(fileConfig());
const { listen: { port: listenPort } } = readHttpServerOptions(config.getConfig('backend'));

const databaseName = 'vde_database';
const logger = loggerService();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', createRouter({logger}));

async function startServer() {
  const migrationManager = new MigrationManager({ dbName: databaseName}); 

  try {
    await migrationManager.createDatabaseIfNotExists();
    await migrationManager.migrate();
    await migrationManager.close();

    app.listen(listenPort, (err: any) => {
      if(err) throw new Error(`Erreur :: ${err}` );
      console.log(`Serveur démarré sur le port ${listenPort}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();