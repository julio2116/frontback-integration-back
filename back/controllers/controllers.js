const path = require("path");
const { readFileQueue, writeFileQueue } = require('../utils/ReadNWrite.js')

const dbPath = path.join(__dirname, '..', 'db', 'products.json');

const getAll = async (req, res) => {
  const data = await readFileQueue(dbPath);
  res.status(200).json({
    status: "ok",
    data,
  })
};

const getOne = async (req, res) => {
  const data = await readFileQueue(dbPath);
  const id = req.params.id;
  const item = data.find((el) => el.id === id);

  if (!item) {
    return res.status(404).json({
      status: "Failed",
      data: "There are no items matching this id value",
    });
  }
  res.status(200).json({
    status: "ok",
    data: item,
  });
}

const createNew = async (req, res) => {
  const data = await readFileQueue(dbPath);
  const newItem = req.body;
  data.push(newItem);
  await writeFileQueue(data, dbPath);

  res.status(200).json({
    status: "ok",
    data: newItem,
  });
};

const deleteItem = async (req, res) => {
  const data = await readFileQueue(dbPath);
  const id = req.params.id;
  const newProducts = data.filter((el) => el.id !== id);

  if(data.length === newProducts.length){
    return res.status(404).json({
      status: 'Failed',
      data: 'This product does not exist!'
    })
  }

  await writeFileQueue(newProducts, dbPath);

  res.status(201).json({
    status: "ok",
  });
};

const updateItem = async (req, res) => {
  const data = await readFileQueue(dbPath);
  const id = req.params.id;
  const newProducts = data.map(el => el.id === id ? Object.assign(el, { ...req.body }) : el);

    if(data.length === newProducts.length){
    return res.status(404).json({
      status: 'Failed',
      data: 'This product does not exist!'
    })
  }

  await writeFileQueue(newProducts, dbPath);

  res.status(200).json({
    status: 'ok',
    data: req.body
  })
};

module.exports = {
  getAll,
  getOne,
  createNew,
  deleteItem,
  updateItem
}