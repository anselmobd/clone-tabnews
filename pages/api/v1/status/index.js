import database from "/infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const serverVersion = await database.getFirstRowColumn(
    "SHOW server_version;",
    "server_version",
  );

  const maxConnections = await database.getFirstRowColumn(
    "SHOW max_connections;",
    "max_connections",
  );

  const openConnections = await database.getFirstRowColumn(
    "SELECT count(*) FROM pg_stat_activity;",
    "count",
  );

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        open_connections: parseInt(openConnections),
      },
    },
  });
}

export default status;
