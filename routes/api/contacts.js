const express = require('express');

const { getAll, add, deleteById } = require('../../controllers/contacts');
const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, getAll);

router.post('/', authenticate, add);

router.delete('/:contactId', authenticate, isValidId, deleteById);

module.exports = router;
