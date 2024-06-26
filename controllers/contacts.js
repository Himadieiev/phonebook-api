const { Contact } = require('../models/contact');

const { HttpError } = require('../helpers');

const { addContactSchema } = require('../models/contact');

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '', { skip, limit }).populate('owner', 'email');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'Missing required name field');
    }
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({ _id: contactId });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({
      message: 'Contact deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  add,
  deleteById,
};
