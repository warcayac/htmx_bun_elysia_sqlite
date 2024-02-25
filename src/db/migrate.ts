import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { db, dissconnectDb } from '.';


// This will run migrations on the database, skipping the ones already applied
migrate(db, {migrationsFolder: process.env.MIGRATIONS_DIR!});

// Don't forget to close the connection, otherwise the script will hang
dissconnectDb();
