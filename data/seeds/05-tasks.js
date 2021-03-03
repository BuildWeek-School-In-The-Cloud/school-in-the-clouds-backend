exports.seed = function (knex) {
    return knex("tasks")
        .del()
        .then(function () {
            return knex("tasks").insert([
            {
                task_name:'task1',
                description:'task1',
                is_completed:false,
                admin_id: 1,
                volunteer_id:1
            },
            {
                task_name:'task2',
                description:'task2',
                is_completed:true,
                admin_id: 2,
                volunteer_id:2
            },
            {
                task_name:'task3',
                description:'task3',
                is_completed:false,
                admin_id: 3,
                volunteer_id:3
            }
            ]);
        });
    };
  