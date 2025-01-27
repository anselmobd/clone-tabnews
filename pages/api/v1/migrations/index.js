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
    const migrations = await migrationRunner({
      ...defaultMigrationOptions, // Spreat / Espalha
      dryRun: true,
    });
    return response.status(200).json(migrations);
  } else if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultMigrationOptions, // Spreat / Espalha
      dryRun: false,
    });

    if (migrations.length === 0) {
      return response.status(200).json(migrations);
    }

    return response.status(201).json(migrations);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
