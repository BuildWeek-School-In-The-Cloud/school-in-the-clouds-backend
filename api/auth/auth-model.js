const db = require("../../data/dbConfig");


const find = () => {
    return db("users");
}

const findById = (id) => {
    return db("users")
        .where({ id })
        .first();
}

const findBy = (filter) => {
    return db("users")
        .where(filter)
        .first();
}

const findTypeBy = (filter, type) => {
    return db(type)
        .select("*")
        .where(filter)
        .first();
}

const findTypeById = async (id, type) => {
    console.log("id, type", id, type);
    
    user = await db("users")
        .join(type, "users.id", "=", `${type}.user_id`)
        .where("users.id", id)
        .select(`${type}.id as id`)
        .first();
    return user;
    
}

const addUser = async (user) => {
    const [id] = await db("users").insert(user, "id");
        return await findById(id);
}

const addAdmin = async (user) => {
    const [id] = await db("admin").insert(user, "id");
    const admin = await db("admin")
        .select("*")
        .where({ id })
        .first();
    return admin;
}

const addVolunteer = async (user) => {
    const [id] = await db("volunteer")
        .insert(user, "id")
        .returning("id");
    const volunteer = await db("volunteer")
        .select("*")
        .where({ id })
        .first();
    return volunteer;
}

const addStudent = async (user) => {
    const [id] = await db("students")
        .insert(user, "id")
        .returning("id");
    const student = await db("students")
        .select("*")
        .where({ id })
        .first();
    return student;
}



module.exports = {
    addUser,
    addAdmin,
    addVolunteer,
    addStudent,
    find,
    findBy,
    findById,
    findTypeBy,
    findTypeById
};