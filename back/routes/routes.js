const express = require("express");
const router = express.Router();
const {createId, validateNewItem, validateKeys} = require('../controllers/middlewares')
const {getAll, getOne, createNew, deleteItem, updateItem} = require('./methods')

router.route("/").get(getAll).post(validateKeys, validateNewItem, createId, createNew);
router.route("/:id").get(getOne).delete(deleteItem).patch(validateKeys, updateItem);

module.exports = router