const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { HttpError } = require('../helpers');

const { schemas } = require('../models/user');

const { SECRET_WORD } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema.validate(req.body);

    if (error) {
      throw HttpError(400, 'Missing required name field');
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      token: null,
    };

    const { _id } = await User.create(newUser);

    const payload = { id: _id };

    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '23h' });

    await User.findByIdAndUpdate(_id, { token });

    res.status(201).json({ id: _id, name: newUser.name, email: newUser.email, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = schemas.loginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'Missing required name field');
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_WORD, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({ name: user.name, email: user.email, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) {
    res.status(204);
  }

  res.status(201).json({
    id: user._id,
    email: user.email,
    name: user.name,
  });
};

const getCurrent = async (req, res) => {
  const { _id, email, name, token } = req.user;

  res.json({ _id, email, name, token });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
};
