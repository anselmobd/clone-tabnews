import { Client } from "pg";

async function query({ sql, values }) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSslValues(),
  });
  console.log("Credenciais do Postgres:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  let result = null;
  try {
    result = await client.query({
      text: sql,
      values: values,
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  return result;
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

export default {
  query: query,
  getRows: getRows,
  getFirstRow: getFirstRow,
  getFirstRowColumn: getFirstRowColumn,
};

function getSslValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production";
}
