const express = require('express');

const getUser = require('../../user/getUser');
const updateUser = require('../../user/updateUser');

const handleJwtControler = require('../../middlewares/handleJwtControler');

const router = express.Router();

router.get('/current', handleJwtControler, getUser);

router.patch('/edit', handleJwtControler, updateUser);

module.exports = router;
