import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.rawQuery("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const responseGet = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseGet.status).toBe(200);
  const responseGetBody = await responseGet.json();
  expect(responseGetBody.length).toBe(0);
});
