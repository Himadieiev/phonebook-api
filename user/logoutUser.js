const { User } = require('../models/user');

const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findOneAndUpdate({ _id: id }, { token: null }, { new: true });

    if (!user) {
      res.status(204);
    }

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(error.status).json(error.message);
  }
};

module.exports = logoutUser;
