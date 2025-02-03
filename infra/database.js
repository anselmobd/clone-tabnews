import { Client } from "pg";

async function rawQuery(sql) {
  let client;
  try {
    client = await getNewConnectedClient();
    const result = await client.query(sql);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function query({ sql, values }) {
  let client;
  try {
    client = await getNewConnectedClient();
    const result = await client.query({
      text: sql,
      values: values,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getRows({ sql, values }) {
  const result = await query({ sql, values });
  return result.rows;
}

async function getFirstRow({ sql, values }) {
  return (await getRows({ sql, values }))[0];
}

async function getFirstRowColumn({ sql, values, name }) {
  return (await getFirstRow({ sql, values }))[name];
}

async function getNewConnectedClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslValues(),
  });
  await client.connect();
  return client;
}

export default {
  rawQuery,
  query,
  getRows,
  getFirstRow,
  getFirstRowColumn,
  getNewConnectedClient,
};

function getSslValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return ["production", "preview"].includes(process.env.NODE_ENV);
}
