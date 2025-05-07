const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

const getAll = (req, res) => {
  fs.readFile("./teste.json", "utf-8", (err, data)=>{
    data = JSON.parse(data);
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

const getOne = (req, res) => {
  fs.readFile("./teste.json", "utf-8", (err, data)=>{
    data = JSON.parse(data);
    const id = req.params.id;
    const item = data.find((el) => el.id === id);
    if (!item)
      res.status(404).json({
        status: "not found",
      });
  
    res.status(200).json({
      status: "success",
      data: item,
    });
  });
};

const createNew = (req, res) => {
  fs.readFile("./teste.json", "utf-8", (err, data)=>{
    data = JSON.parse(data);
    const newItem = req.body;
    data.push(newItem);
  
    fs.writeFile("./teste.json", JSON.stringify(data, null, 2), ()=>{
      res.status(200).json({
        status: "success",
        item: newItem,
      });
    });

  });
};

const deleteItem = (req, res) => {
  fs.readFile("./teste.json", 'utf-8', (err, data)=>{
    data = JSON.parse(data)
  
    const id = req.params.id;
    const newTeste = data.filter((el) => el.id !== id);
    fs.writeFile("./teste.json", JSON.stringify(newTeste, null, 2), ()=>{
      res.status(201).json({
        status: "success",
      });
    });
  });
};

const updateItem = ((req, res) => {
  fs.readFile('./teste.json', 'utf-8', (err, data)=>{
    data = JSON.parse(data);
    const id = req.params.id;
  
    const newTeste = data.map(el => el.id === id ? Object.assign(el, { ...req.body }) : el);
    fs.writeFile("./teste.json", JSON.stringify(newTeste, null, 2), ()=>{
      res.status(200).json({
        status: 'success',
        data: req.body
      })
    });
  })
});

const createId = (req, res, next) => {
  const teste = JSON.parse(fs.readFileSync("./teste.json"));
  const id = 'item-' + Math.floor(Math.random() * 10000) + teste.length + 1;
  req.body = Object.assign({ id }, req.body);
  next();
};

const validateNewItem = (req, res, next) => {
  const {
    nome,
    tamanho,
    preco,
    cor,
    categoria,
    imagem,
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

const validateKeys = ((req, res, next) => {
  const body = req.body;
  const itemKeys = ['nome', 'tamanho', 'preco', 'cor', 'categoria', 'imagem']
  for (const key in body) {
    if (itemKeys.includes(key) == false) {
      return res.status(400).json({
        status: 'fail',
        message: 'inform only valid keys'
      })
    }
  }
  next()
})

router.route("/").get(getAll).post(validateKeys, validateNewItem, createId, createNew);
router.route("/:id").get(getOne).delete(deleteItem).patch(validateKeys, updateItem);

app.use("/api/v1/teste", router);

app.listen(8000, "localhost", () => {
  console.log("http://localhost:8000");
});
