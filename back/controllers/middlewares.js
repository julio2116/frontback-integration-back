const fs = require("fs");

const createId = (req, res, next) => {
  const id = 'item-' + Math.floor(Math.random() * 10000);
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
});

module.exports = {
    createId,
    validateNewItem,
    validateKeys
}