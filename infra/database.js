import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  let result = null;
  try {
    result = await client.query(queryObject);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  return result;
}

async function getRows(sql) {
  return (await query(sql)).rows;
}

async function getFirstRow(sql) {
  return (await getRows(sql))[0];
}

async function getFirstRowColumn(sql, name) {
  return (await getFirstRow(sql))[name];
}

export default {
  query: query,
  getRows: getRows,
  getFirstRow: getFirstRow,
  getFirstRowColumn: getFirstRowColumn,
};
