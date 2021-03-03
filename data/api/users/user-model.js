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

module.exports = {
  add,
  edit,
  remove,
  getAll,
  findBy,
  findById,
};
