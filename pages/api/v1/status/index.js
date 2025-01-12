import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1+1 AS sum;");
  console.log(result.rows);

  // response.setHeader("Content-Type", "text/plain; charset=utf-8");
  // response.status(200).send("Status: Curso.dev é acima da média");
  response.status(200).json({ Status: "OK" });
}

export default status;
