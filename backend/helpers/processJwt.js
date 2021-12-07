const jwt = require("jsonwebtoken");

const User = require('../models/User');

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {id: id},
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt
}