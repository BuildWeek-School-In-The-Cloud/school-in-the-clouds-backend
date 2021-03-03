const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secret");

function generateToken(user) {
  const payload = {
    username: user.username,
    password: user.password,
    role: user.role
  };
  const options = {
    expiresIn: "3600s",
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = {
  generateToken,
};
