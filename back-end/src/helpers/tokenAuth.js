require('dotenv/config');
const JWT = require('jsonwebtoken');
const { readFileSync } = require('fs');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generate = (payload) => {
  const token = JWT.sign(payload, readFileSync('jwt.evaluation.key', 'utf8'), jwtConfig);
  return token;
};

const verificateToken = (token) => {
  try {
    const decoded = JWT.verify(token, readFileSync('jwt.evaluation.key', 'utf8'));
    return decoded;
  } catch (error) {
    return null;
  }
 };

module.exports = {
  generate,
  verificateToken,
};