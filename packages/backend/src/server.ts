import { MigrationManager } from "./utils/MigrationManager";
import express from 'express';
import { createRouter } from './routes/router';
import logger from '../src/utils/logger';

const PORT = process.env.BACKEND_PORT || 7007;
const databaseName = 'vde_database';

const app = express();
app.use('/api', createRouter());

async function startServer() {
  const migrationManager = new MigrationManager({ dbName: databaseName}); 

  try {
    await migrationManager.createDatabaseIfNotExists();
    await migrationManager.migrate();
    await migrationManager.close();

    app.listen(PORT, (err: any) => {
      if(err) throw new Error(`Erreur :: ${err}` );
      logger.info(`Serveur démarré sur le port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();