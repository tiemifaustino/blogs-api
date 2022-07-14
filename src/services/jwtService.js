require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, JWT_SECRET);
    return token;
  },

};

module.exports = jwtService;