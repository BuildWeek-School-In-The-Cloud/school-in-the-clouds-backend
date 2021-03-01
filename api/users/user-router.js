const router = require("express").Router();

const User = require("./user-model");
const checkRole = require('../../api/middleware/check-role-mw')
const restricted = require('../middleware/restricted')

router.get("/", restricted, checkRole('admin'), (req, res) => {
  User.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  User.edit(req.params.id, req.body)
    .then((editedUser) => {
      res.status(200).json(editedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then(() => {
      res.status(200).json({ message: `User ${id} has been removed` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
