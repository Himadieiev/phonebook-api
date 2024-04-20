const jwt = require('jsonwebtoken');

const createJWT = payload => {
  const token = jwt.sign(payload, process.env.SECRET_WORD);
  return token;
};

const verificationJWT = token => {
  try {
    const isJwtTrue = jwt.verify(token, process.env.SECRET_WORD);
    return isJwtTrue;
  } catch (error) {
    console.error('Error creating user', error);
  }
};

const decodeJwt = token => {
  return jwt.decode(token);
};

module.exports = { createJWT, verificationJWT, decodeJwt };
