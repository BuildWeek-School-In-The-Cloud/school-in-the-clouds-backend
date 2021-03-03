const User = require("../users/user-model");


const checkUsernameUnique = async (req, res, next) => {
  try {
    const rows = await User.findBy({ username: req.body.username });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json({ error: "Username taken" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const checkPayload = (req, res, next) => {
    if (
        !req.body.username ||
        !req.body.password ||
        !req.body.role
        ) {
            res.status(401).json({ error: "Please provide all information" });
        } else {
            next();
        }
    }
    
    
    module.exports = {
      checkUsernameUnique,
      checkPayload
    };
