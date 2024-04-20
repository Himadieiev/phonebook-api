const { Contact, addContactSchema } = require('../models/contacts');

const addContact = async (req, res, next) => {
  try {
    const { error, value } = addContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newContact = new Contact({
      name: value.name,
      number: value.number,
      createdAt: new Date(),
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Error adding contact' });
  }
};

module.exports = addContact;
