const router = require("express").Router();
const Tasks = require("../tasks/tasks-model");



router.get("/tasks", /*restricted, */ /*checkRole('admin'),*/ (req, res) => {
  Tasks.find()
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/tasks", async (req, res, next) => {
    const admin_id = req.params.id;
    if (!req.body) {
      next("missing task data");
    } else {
      const { task_name, description, is_completed, volunteer_id } = req.body;
      if (!task_name || !description) {
        next("Task title and description are required");
      } else if (!volunteer_id) {
        next("A valid volunteer_id is required");
      } else {
        const task = {
          task_name: task_name,
          description: description,
          is_completed: is_completed,
          admin_id: admin_id,
          volunteer_id: volunteer_id
        };
  
        try {
          const newTask = await Tasks.addTask(task);
          res.status(201).json(newTask);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    }
  });
  
  router.put("/:id/tasks", async (req, res, next) => {
    if (!req.body) {
      return next("missing task data");
    } else {
      const updates = req.body;
      const id = updates.id;
      try {
        const task = await Tasks.findById(id);
        if (!task) {
          next(`There is no task with id: ${id} to update`);
        } else {
          const updateTasks = await Tasks.update(id, updates);
          res.status(201).json(updates);
        }
      } catch (error) {
        res.status(500).json({ message: error.message,  });
      }
    }
  });
  
  router.get("/:id/tasks", async (req, res) => {
    const { id } = req.params;
    try {
      const tasks = await Tasks.findBy({ admin_id: id });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;