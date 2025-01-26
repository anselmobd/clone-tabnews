import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  let dryRun;
  if (request.method === "GET") {
    dryRun = true;
  } else if (request.method === "POST") {
    dryRun = false;
  } else {
    response.status(405).json({ message: "Method not allowed" });
    return;
  }
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  response.status(200).json(migrations);
}
