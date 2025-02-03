import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const dbClient = await database.getNewConnectedClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions, // Spread / Espalha
      dryRun: true,
    });
    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  } else if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, // Spreat / Espalha
      dryRun: false,
    });
    await dbClient.end();

    if (migratedMigrations.length === 0) {
      return response.status(200).json(migratedMigrations);
    }

    return response.status(201).json(migratedMigrations);
  }
}
