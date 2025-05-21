const express = require("express");
const cors = require("cors");
const options = require('../config/corsConfig.js')

const app = express();
app.use(express.json());
app.use(cors(options));

const router = require('../routes/routes')

app.use("/api/v1/products", router);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});