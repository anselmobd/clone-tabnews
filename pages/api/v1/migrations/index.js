import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions, // Spreat / Espalha
      dryRun: true,
    });
    return response.status(200).json(pendingMigrations);
  } else if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, // Spreat / Espalha
      dryRun: false,
    });

    if (migratedMigrations.length === 0) {
      return response.status(200).json(migratedMigrations);
    }

    return response.status(201).json(migratedMigrations);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
