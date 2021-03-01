exports.seed = function (knex) {
    return knex("users")
      .truncate()
      .then(function () {
        return knex("users").insert([
          {
            username: "admin",
            password: "1234",
            role: "admin"
          },
          {
            username: "matt",
            password: "1234",
            role: "student"
          
          },
          {
            username: "bob",
            password: "1234",
            role: "volunteer"
          },
        ]);
      });
  };
  