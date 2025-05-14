const fs = require("fs");
const path = require("path");
const { readFileQueue, writeFileQueue } = require('../controllers/controllers.js')

const dbPath = path.join(__dirname, '..', 'db', 'products.json');

const getAll = async (req, res) => {
  const data = await readFileQueue(dbPath);
  res.status(200).json({
    status: "success",
    data,
  })
};

const getOne = (req, res) => {
  fs.readFile(dbPath, "utf-8", (err, data) => {
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
  fs.readFile(dbPath, "utf-8", (err, data) => {
    data = JSON.parse(data);
    const newItem = req.body;
    data.push(newItem);

    fs.writeFile(dbPath, JSON.stringify(data, null, 2), () => {
      res.status(200).json({
        status: "success",
        item: newItem,
      });
    });

  });
};

const deleteItem = (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    data = JSON.parse(data)

    const id = req.params.id;
    const newProducts = data.filter((el) => el.id !== id);
    fs.writeFile(dbPath, JSON.stringify(newProducts, null, 2), () => {
      res.status(201).json({
        status: "success",
      });
    });
  });
};

const updateItem = ((req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    data = JSON.parse(data);
    const id = req.params.id;

    const newProducts = data.map(el => el.id === id ? Object.assign(el, { ...req.body }) : el);
    fs.writeFile(dbPath, JSON.stringify(newProducts, null, 2), () => {
      res.status(200).json({
        status: 'success',
        data: req.body
      })
    });
  })
});

module.exports = {
  getAll,
  getOne,
  createNew,
  deleteItem,
  updateItem
}