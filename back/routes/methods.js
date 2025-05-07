const fs = require("fs");

const getAll = (req, res) => {
  fs.readFile("./back/db/products.json", "utf-8", (err, data)=>{
    data = JSON.parse(data);
    res.status(200).json({
      status: "success",
      data,
    });
  });
};

const getOne = (req, res) => {
  fs.readFile("./back/db/products.json", "utf-8", (err, data)=>{
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
  fs.readFile("./back/db/products.json", "utf-8", (err, data)=>{
    data = JSON.parse(data);
    const newItem = req.body;
    data.push(newItem);
  
    fs.writeFile("./back/db/products.json", JSON.stringify(data, null, 2), ()=>{
      res.status(200).json({
        status: "success",
        item: newItem,
      });
    });

  });
};

const deleteItem = (req, res) => {
  fs.readFile("./back/db/products.json", 'utf-8', (err, data)=>{
    data = JSON.parse(data)
  
    const id = req.params.id;
    const newProducts = data.filter((el) => el.id !== id);
    fs.writeFile("./back/db/products.json", JSON.stringify(newProducts, null, 2), ()=>{
      res.status(201).json({
        status: "success",
      });
    });
  });
};

const updateItem = ((req, res) => {
  fs.readFile('./back/db/products.json', 'utf-8', (err, data)=>{
    data = JSON.parse(data);
    const id = req.params.id;
  
    const newProducts = data.map(el => el.id === id ? Object.assign(el, { ...req.body }) : el);
    fs.writeFile("./back/db/products.json", JSON.stringify(newProducts, null, 2), ()=>{
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