test("GET to /api/v1/status should return 200", async () => {
  // test request
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  // console.log("responseBody", responseBody);

  // test response structure
  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.dependencies).toBeDefined();
  expect(Object.keys(responseBody).length).toBe(2);

  expect(responseBody.dependencies.database).toBeDefined();
  expect(Object.keys(responseBody.dependencies).length).toBe(1);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.open_connections).toBeDefined();
  expect(Object.keys(responseBody.dependencies.database).length).toBe(3);

  // test response content
  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toBe("16.6");
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  expect(responseBody.dependencies.database.open_connections).toBe(1);
});
