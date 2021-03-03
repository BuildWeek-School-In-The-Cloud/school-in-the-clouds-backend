exports.up = function (knex) {
    return knex.schema
        //TABLE FOR ALL REGISTERED USERS
        .createTable('users', users => {
            users.increments();
            users.string('username', 255).notNullable().unique().index()
            users.string('password', 255).notNullable();
            users.string('role', 25).notNullable().defaultTo('admin')
        })



        .createTable('admin', admins => {
            admins.increments()
            admins
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete("CASCADE")
                .onUpdate('CASCADE')
        })



        .createTable('volunteer', v => {
            v.increments()
            v.string('availability', 64).notNullable()
            v.string('country', 64).notNullable()
            v
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete("CASCADE")
                .onUpdate('CASCADE')
        })



        .createTable('students', s => {
            s.increments()
            s
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete("CASCADE")
                .onUpdate('CASCADE')
        })



        //TABLE FOR TASKS
        .createTable('tasks', t => {
            t.increments()
            t.string('task_name', 256).notNullable()
            t.string('description', 1500).notNullable()
            t
                .boolean('is_completed')
                .notNullable()
                .defaultTo(false)
            t
                .integer('admin_id')
                .unsigned()
                .references('id')
                .inTable('admin')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            t
                .integer('volunteer_id')
                .unsigned()
                .references('id')
                .inTable('volunteer')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
  };
  
  exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('students')
        .dropTableIfExists('volunteer')
        .dropTableIfExists('admin')
        .dropTableIfExists('users')
  };