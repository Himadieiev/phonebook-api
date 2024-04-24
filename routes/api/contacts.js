const express = require('express');

const getAllContacts = require('../../contacts/getAllContact');
const addContact = require('../../contacts/addContact');
const deleteContact = require('../../contacts/deleteContact');

const handleJwtControler = require('../../middlewares/handleJwtControler');

const router = express.Router();

router.get('/', handleJwtControler, getAllContacts);

router.post('/', handleJwtControler, addContact);

router.delete('/:contactId', handleJwtControler, deleteContact);

module.exports = router;
