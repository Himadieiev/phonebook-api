const { Schema, model } = require('mongoose');

const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().max(20).required().messages({
    'string.base': 'The name must be a string',
    'string.max': 'The name must be max 20',
    'any.required': 'The name field a required',
  }),
  number: Joi.string().max(15).required().messages({
    'string.base': 'The number must be a string',
    'string.max': 'The number must be max 15',
    'any.required': 'The number field a required',
  }),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 20,
      required: true,
    },
    number: {
      type: String,
      maxLength: 15,
      required: true,
    },
    createdAt: {
      type: Date,
      required: [true, 'created at is required'],
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  addContactSchema,
};
