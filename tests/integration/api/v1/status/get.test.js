test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log("responseBody", responseBody);

  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.database).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  console.log("parsedUpdatedAt", parsedUpdatedAt);
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);
});
