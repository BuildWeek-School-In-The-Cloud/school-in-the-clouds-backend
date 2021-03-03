function isValid(user) {
    return Boolean(
      user.username && user.password && user.role && typeof user.password === "string"
    );
  }
  
  module.exports = {
    isValid,
  };
  