exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users.string('username', 255).notNullable().unique().index();
      users.string('password', 255).notNullable();
      users.string('role', 25).notNullable().defaultTo('admin')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };
  