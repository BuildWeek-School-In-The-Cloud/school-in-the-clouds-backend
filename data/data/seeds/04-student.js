exports.seed = function (knex) {
    return knex('students')
        .del()
        .then(function () {
            return knex('students').insert([
                {
                    user_id:1
                },
                {
                    user_id:2
                },
                {
                    user_id:3
                }
            ])
        })
}