const router = require("express").Router();
const User = require("./user-model");
const checkRole = require('../../api/middleware/check-role-mw')
const restricted = require('../middleware/restricted')



// GET REQUEST TO GET ALL REGISTERED USERS 
router.get("/volunteers", restricted, checkRole('admin'), (req, res) => {
  User.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// GET REGISTER USER BY ID
router.get("/volunteers/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// EDIT USER BY ID
router.put("/volunteers/:id", (req, res) => {
  User.edit(req.params.id, req.body)
    .then((editedUser) => {
      res.status(200).json(editedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// DELETE USER BY ID
router.delete("/volunteers/:id", (req, res) => {
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
