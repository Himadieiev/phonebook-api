const { Contact } = require('../models/contacts');

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully', deletedContact });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};

module.exports = deleteContact;
