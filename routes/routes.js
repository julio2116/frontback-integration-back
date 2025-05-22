const express = require("express");
const router = express.Router();
const { createId, validateNewItem, validateKeys, verifyMethod } = require('../middlewares/middlewares.js')
const { getAll, getOne, createNew, deleteItem, updateItem } = require('../controllers/controllers.js')

router.route("/").all(verifyMethod).get(getAll).post(validateKeys, validateNewItem, createId, createNew);
router.route("/:id").all(verifyMethod).get(getOne).delete(deleteItem).patch(validateKeys, updateItem);

module.exports = router