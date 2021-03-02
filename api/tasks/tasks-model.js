const db = require("../../data/dbConfig");


const find = () => {
    return db("tasks");
}

const findById = (id) => {
    return db("tasks")
    .where({ id })
    .first();
}

const findBy = (filter) => {
    return db("tasks").where(filter);
}

const addTask = async (task) => {
    let newTask = {
        task_name: task.task_name,
        description: task.description,
        is_completed: task.is_completed,
        admin_id: task.admin_id,
        volunteer_id: task.volunteer_id
    };
    const [id] = await db("tasks").insert(newTask, "id");
    return await findById(id);
}

const update = async (id, changes) => {
    await db("tasks")
        .where({ id })
        .update(changes);
    
    return findById(id);
}

const del = async (id) => {
    const task = await db("tasks")
    .where({ id })
    .del();
    return task;
}


module.exports = {
  addTask,
  find,
  findBy,
  findById,
  update,
  del
};