const express = require("express");

const {getAll, add, deleteById, updateById} = require("../../controllers/contacts");
const {isValidId, authenticate} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getAll);

router.post("/", authenticate, add);

router.delete("/:contactId", authenticate, isValidId, deleteById);

router.put("/:contactId", authenticate, isValidId, updateById);

module.exports = router;
