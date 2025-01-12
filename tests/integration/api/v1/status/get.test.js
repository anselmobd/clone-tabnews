test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log("responseBody", responseBody);

  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.database).toBeDefined();
  expect(responseBody.database.version).toBeDefined();
  expect(responseBody.database.max_connections).toBeDefined();
  expect(responseBody.database.open_connections).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  console.log("parsedUpdatedAt", parsedUpdatedAt);
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.database.version).toMatch(/^[0-9\.]+$/);
  expect(responseBody.database.max_connections).toBeGreaterThan(0);
  expect(responseBody.database.open_connections).toBeGreaterThan(0);
});
