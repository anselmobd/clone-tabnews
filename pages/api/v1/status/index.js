function status(request, response) {
  // response.setHeader("Content-Type", "text/plain; charset=utf-8");
  // response.status(200).send("Status: Curso.dev é acima da média");

  response.status(200).json({ Status: "OK" });
}

export default status;
