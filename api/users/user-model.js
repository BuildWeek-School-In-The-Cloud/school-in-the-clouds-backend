const db = require("../../data/dbConfig");

const add = async (user) =>  {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

const edit = (id, changes) => {
  return db("users").where({ id }).update(changes);
}

const remove = (id) => {
  return db("users").where({ id }).del();
}

const getAll = () => {
  return db("users");
}

const findBy = (filter) => {
  return db("users").where(filter).orderBy("id");
}

const findById = (id) => {
  return db("users").where({ id }).first();
}

const find = () => {
  return db('volunteer as v')
  .join('users as u', 'v.user_id', 'u.id')
  .select(
    'v.id as volunteer_id',
    'u.id as user_id',
    'u.username as username',
    'v.availability',
    'v.country'
  )
}

module.exports = {
  add,
  edit,
  remove,
  getAll,
  findBy,
  findById,
  find
};
