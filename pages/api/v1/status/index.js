import database from "/infra/database.js";

async function status(request, response) {
  // const result = await database.query("SELECT 1+1 AS sum;");
  const updatedAt = new Date().toISOString();
  response.status(200).json({
    update_at: updatedAt,
    database: {},
  });
}

export default status;
