exports.seed = function (knex) {
    return knex("users")
      .del()
      .then(function () {
        return knex("users").insert([
          {
            username: "admin",
            password: "1234",
            role: "admin"
          },
          {
            username: "Jacob",
            password: "1234",
            role: "student"
          
          },
          {
            username: "Tim",
            password: "1234",
            role: "volunteer"
          },
        ]);
      });
  };