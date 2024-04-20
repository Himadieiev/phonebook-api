const bcrypt = require('bcrypt');

const compareHashPassword = async (password, hashPassword) => {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
};

module.exports = {
  compareHashPassword,
};
