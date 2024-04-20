const { User } = require('../models/user');

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const updateData = {
      email: req.user.email,
      name: req.user.name,
      updatedAt: req.user.updatedAt,
    };

    let isUpdateNeed = false;

    if (!!email && email !== req.user.email) {
      const userWithThisEmail = await User.findOne({
        email,
      });

      if (userWithThisEmail) {
        res.status(409).json({ message: 'email in use' });
        return;
      }
      updateData.email = email;
      isUpdateNeed = true;
    }
    if (!!name && name !== req.user.name) {
      updateData.name = name;
      isUpdateNeed = true;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    updateData.updatedAt = formattedDate;

    if (!isUpdateNeed) {
      res.status(201).json({ ...updateData });
      return;
    }

    await User.findOneAndUpdate({ _id: req.user._id }, updateData);

    res.status(201).json({
      ...updateData,
    });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(error.status).json(error.message);
  }
};

module.exports = updateUser;
