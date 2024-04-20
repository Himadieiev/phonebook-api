const { Contact } = require('../models/contacts');

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts' });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ message: 'Error getting contacts', error: error.message });
  }
};

module.exports = getAllContacts;
