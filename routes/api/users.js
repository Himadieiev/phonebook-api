const express = require('express');

const { getCurrent } = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/current', authenticate, getCurrent);

module.exports = router;
