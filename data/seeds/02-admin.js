exports.seed = function(knex) {
    return knex('admin')
        .truncate()
        .then(function () {
            return knex('admin').insert([
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