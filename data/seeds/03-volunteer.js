exports.seed = function (knex) {
    return knex('volunteer') 
        .del()
        .then(function() {
            return knex('volunteer').insert([
                {
                    availability: "allthetime",
                    country: "canada",
                    user_id:1
                },
                {
                    availability: "evenmoreofthetime",
                    country: "italy",
                    user_id:2
                },
                {
                    availability: "noneofthetime",
                    country: "france",
                    user_id:3
                }
            ])
        })
}