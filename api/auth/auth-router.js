const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const User = require("../users/user-model");
const { isValid } = require("../users/user-service");
const { generateToken } = require("../../utils/generateToken");
const { checkPayload } = require("../middleware/middleware");
const { checkUsernameUnique } = require("../middleware/middleware");
const { jwtSecret } = require("../../utils/secret");

router.post("/register", [checkPayload, checkUsernameUnique], (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    User.add(credentials)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Please fill out all required fields." });
  }
});

router.post("/login", (req, res) => {
  const { username, password, role, id } = req.body;

  if (isValid(req.body)) {
    User.findBy({ username: username, role: role})
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password) && role) {
          const token = generateToken(user);
          res.status(200).json({ message: `{ 'username':'${user.username}', 'role':'${user.role}', 'id':${user.id} }`, token });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Username, password, and role required" });
  }
});



module.exports = router;
