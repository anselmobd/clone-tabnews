import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const serverVersion = await database.getFirstRowColumn({
    sql: "SHOW server_version;",
    name: "server_version",
  });

  const maxConnections = await database.getFirstRowColumn({
    sql: "SHOW max_connections;",
    name: "max_connections",
  });

  const openConnections = await database.getFirstRowColumn({
    sql: "SELECT count(*)::INT FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
    name: "count",
  });

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        open_connections: openConnections,
      },
    },
  });
}

export default status;
