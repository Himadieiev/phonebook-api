const { verificationJWT, decodeJwt } = require('../user/jwt');

const { User } = require('../models/user');

const handleJwtControler = async (req, res, next) => {
  try {
    if (!req.headers.authorization || req.headers.authorization.split(' ').length < 2) {
      res.status(400).json({ message: 'token not transferred' });
      return;
    }

    const [, token] = req.headers.authorization.split(' ');

    const isTokenValid = verificationJWT(token);
    if (!isTokenValid) {
      res.status(401).json({
        message: 'Not authorized',
      });
      return;
    }

    const { id } = decodeJwt(token);

    const user = await User.findOne({ _id: id });

    if (!!user && user.token === token) {
      req.user = user;
      next();
      return;
    }

    res.status(401).json({
      message: 'Not authorized',
    });
  } catch (error) {
    console.error('Error creating user', error);
    return res.status(error.status).json(error.message);
  }
};

module.exports = handleJwtControler;
