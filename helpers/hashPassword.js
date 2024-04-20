const bcrypt = require('bcrypt');

const createHashPassword = async password => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

module.exports = {
  createHashPassword,
};
