const express = require("express");
const parser = require("body-parser");
const path = require("path");
const db = require("../database/index.js");
const PORT = 9000;
const router = require("./routes.js");
const app = express();
const cors = require("cors");

app.use(express.static(path.resolve(__dirname, "../static")));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.use("/suggested/api", router);

app.listen(PORT, () => {
  console.log("Module listening in port:", PORT);
});
