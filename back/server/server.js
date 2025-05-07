const express = require("express");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

const router = require('../routes/routes')

app.use("/api/v1/teste", router);

app.listen(8000, "localhost", () => {
  console.log("http://localhost:8000");
});