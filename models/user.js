const { Schema, model } = require('mongoose');

const handleMongodbError = require('../helpers/handleMongodbError');

const Joi = require('joi');

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 3,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    createdAt: { type: String, default: Date.now() },
    updatedAt: { type: String, default: null },
  },
  {
    versionKey: false,
  }
);

userSchema.post('save', handleMongodbError);

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(3).required().messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.min': 'min length of password must be 8',
    'string.empty': 'The password must not be empty.',
  }),
  name: Joi.string().required().empty(false).messages({
    'string.base': 'The name must be a string',
    'any.required': 'the name faild is required',
  }),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(3).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.min': 'min length of password must be 8',
    'string.empty': 'The password must not be empty.',
  }),
});

const User = model('users', userSchema);

module.exports = {
  User,
  joiUserSchema,
  loginJoiSchema,
};
