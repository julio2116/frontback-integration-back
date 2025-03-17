const express = require("express");
const fs = require("fs");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

const router = express.Router();

const getAll = (req, res) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  res.status(200).json({
    status: "success",
    data: teste,
  });
};
const getOne = (req, res) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  const id = Number(req.params.id);
  const item = teste.find((el) => el.id === id);
  if (!item)
    res.status(404).json({
      status: "not found",
    });

  res.status(200).json({
    status: "success",
    data: item,
  });
};
const createNew = (req, res) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  const newItem = req.body;
  teste.push(newItem);

  fs.writeFile("./teste.json", JSON.stringify(teste), () => {
    res.status(200).json({
      status: "success",
      item: newItem,
    });
  });
};
const createId = (req, res, next) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  const id = teste.length + 1;
  req.body = Object.assign({ id }, req.body);
  next();
};
const validateNewItem = (req, res, next) => {
  const {
    nome = null,
    tamanho = null,
    preco = null,
    cor = null,
    categoria = null,
    imagem = null,
  } = req.body;

  const newBody = { nome, tamanho, preco, cor, categoria, imagem };

  for (const key in newBody) {
    if (!newBody[key]) {
      return res.status(400).json({
        status: "fail",
        message: "inform all the camps",
      });
    }
  }
  next();
};
const deleteItem = (req, res) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  const id = Number(req.params.id);

  const newTeste = teste.filter((el) => el.id !== id);
  fs.writeFile("./teste.json", JSON.stringify(newTeste), (err) => {
    res.status(201).json({
      status: "success",
    });
  });
};

router.route("/").get(getAll).post(validateNewItem, createId, createNew);
router.route("/:id").get(getOne).delete(deleteItem);

app.use("/api/v1/teste", router);

app.listen(8000, "localhost", () => {
  console.log("http://localhost:8000");
});
