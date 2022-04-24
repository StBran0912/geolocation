const express = require("express");
const app = express();
const nedb = require("nedb");
const db = new nedb({ filename: "locations.db", autoload: true });

app.use(express.json({ limit: "1mb" }));

//Statisches Verzeichnis setzen
app.use(express.static("public"));

app.use("/", (req, res, next) => {
  console.log(
    `Zugriff am: ${new Date().toLocaleString()}     von Client: ${req.ip}`
  );
  next();
});

app.post("/api", (req, res) => {
  db.insert(req.body);
  res.send({ status: "Server meldet Post-Anfrage bearbeitet" });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server gestartet an Port ${PORT}`));
