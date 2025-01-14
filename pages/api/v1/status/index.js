import database from "/infra/database.js";

async function getRows(sql) {
  return (await database.query(sql)).rows;
}

async function getFirstRow(sql) {
  return (await getRows(sql))[0];
}

async function getFirstRowColumn(sql, name) {
  return (await getFirstRow(sql))[name];
}

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const serverVersion = await getFirstRowColumn(
    "SHOW server_version;",
    "server_version",
  );

  const resultMaxConnections = await database.query("SHOW max_connections;");
  console.log(resultMaxConnections.rows);
  const maxConnections = resultMaxConnections.rows[0].max_connections;

  const resultOpenConnections = await database.query(
    "SELECT count(*) open_connections FROM pg_stat_activity;",
  );
  console.log(resultOpenConnections.rows);
  const openConnections = resultOpenConnections.rows[0].open_connections;

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
