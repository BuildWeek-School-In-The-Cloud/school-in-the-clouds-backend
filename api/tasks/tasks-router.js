const router = require("express").Router();
const Task = require("../tasks/tasks-model");

router.get('/tasks', (req,res) => {
    Task.find()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch((err) => {
            res.status(500).json(err.message)
        })
})


router.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findBy({ id });
      if (!task.length) {
        res.status(404).json({ message: `Task with id: ${id} not found` });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Task.del(id);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json({
        message: `Deleted ${deleted} task`
      });
    }
  });


module.exports = router