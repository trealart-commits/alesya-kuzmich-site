const express = require("express");
const path = require("path");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.static(__dirname));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Alesya Kuzmich site: http://localhost:${port}`);
});
