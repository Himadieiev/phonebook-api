const { User, loginJoiSchema } = require('../models/user');

const { compareHashPassword } = require('../helpers/comparePassword');

const { createJWT } = require('./jwt');

const loginUser = async (req, res, next) => {
  try {
    const { error } = loginJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json({
        message: 'Email or password is wrong',
      });
      return;
    }

    const isPasswordTrue = await compareHashPassword(req.body.password, user.password);

    if (!isPasswordTrue) {
      res.status(401).json({
        message: 'Email or password is wrong',
      });
      return;
    }

    const token = createJWT({
      id: user.id,
      email: user.email,
    });

    user.token = token;

    await User.findOneAndUpdate({ _id: user.id }, user);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: req.body.email,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Error login user', error);
    res.status(500).json({ message: 'Error login user' });
  }
};

module.exports = loginUser;
