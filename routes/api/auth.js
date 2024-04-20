const express = require('express');

const setUser = require('../../user/setUser');
const loginUser = require('../../user/loginUser');
const logoutUser = require('../../user/logoutUser');

const hendleJwtControler = require('../../middlewares/handleJwtControler');

const router = express.Router();

router.post('/register', setUser);

router.post('/login', loginUser);

router.post('/logout', hendleJwtControler, logoutUser);

module.exports = router;
