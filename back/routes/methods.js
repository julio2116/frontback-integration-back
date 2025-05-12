const fs = require("fs");
const path = require("path");

const dbPath = process.env.NODE_ENV === "production"
  ? "/mnt/data/products.json"
  : path.join(__dirname, "../db/products.json");

const dirPath = path.dirname(dbPath);


fs.exists(dirPath, (exists) => {
  if (!exists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.exists(dbPath, (exists) => {
    if (!exists) {
      fs.writeFile(dbPath, '[]', (err) => {
        if (err) {
          console.error('Erro ao criar o arquivo:', err);
        } else {
          console.log('Arquivo criado com sucesso!');
        }
      });
    }
  });
});

const getAll = (req, res) => {
  fs.readFile(dbPath, "utf-8", (err, data)=>{
    data = JSON.parse(data);
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

const getOne = (req, res) => {
  fs.readFile(dbPath, "utf-8", (err, data)=>{
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
  fs.readFile(dbPath, "utf-8", (err, data)=>{
    data = JSON.parse(data);
    const newItem = req.body;
    data.push(newItem);
  
    fs.writeFile(dbPath, JSON.stringify(data, null, 2), ()=>{
      res.status(200).json({
        status: "success",
        item: newItem,
      });
    });

  });
};

const deleteItem = (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data)=>{
    data = JSON.parse(data)
  
    const id = req.params.id;
    const newProducts = data.filter((el) => el.id !== id);
    fs.writeFile(dbPath, JSON.stringify(newProducts, null, 2), ()=>{
      res.status(201).json({
        status: "success",
      });
    });
  });
};

const updateItem = ((req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data)=>{
    data = JSON.parse(data);
    const id = req.params.id;
  
    const newProducts = data.map(el => el.id === id ? Object.assign(el, { ...req.body }) : el);
    fs.writeFile(dbPath, JSON.stringify(newProducts, null, 2), ()=>{
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