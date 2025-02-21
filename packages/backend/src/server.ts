import app from "./app";
import { MigrationManager } from "./utils/MigrationManager";

const PORT = process.env.BACKEND_PORT || 7007;
const databaseName = 'your_db_name';

async function startServer() {
  const migrationManager = new MigrationManager({ dbName: databaseName}); 

  try {
    await migrationManager.createDatabaseIfNotExists();
    await migrationManager.migrate();
    // await migrationManager.close();

    app.listen(PORT, (err: any) => {
      if(err) throw new Error(`Erreur :: ${err}` );
      console.log(`Serveur démarré sur le port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();