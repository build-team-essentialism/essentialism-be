
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('top_values').insert([
    {user_id: 1, value_id: 1},
    {user_id: 1, value_id: 2},
    {user_id: 1, value_id: 3},
    {user_id: 2, value_id: 5},
    {user_id: 2, value_id: 6},
    {user_id: 2, value_id: 7},
    {user_id: 3, value_id: 9},
    {user_id: 3, value_id: 10},
    {user_id: 3, value_id: 11},
    {user_id: 4, value_id: 13},
    {user_id: 4, value_id: 14},
    {user_id: 4, value_id: 15},
    {user_id: 5, value_id: 17},
    {user_id: 5, value_id: 18},
    {user_id: 5, value_id: 19},
    {user_id: 6, value_id: 21},
    {user_id: 6, value_id: 22},
    {user_id: 6, value_id: 1},
    {user_id: 7, value_id: 3},
    {user_id: 7, value_id: 4},
    {user_id: 7, value_id: 5},
    {user_id: 8, value_id: 7},
    {user_id: 8, value_id: 8},
    {user_id: 8, value_id: 9},
    {user_id: 9, value_id: 11},
    {user_id: 9, value_id: 12},
    {user_id: 9, value_id: 13},
    {user_id: 10, value_id: 15},
    {user_id: 10, value_id: 16},
    {user_id: 10, value_id: 17},
    {user_id: 11, value_id: 19},
    {user_id: 11, value_id: 20},
    {user_id: 11, value_id: 21},
    {user_id: 12, value_id: 1},
    {user_id: 12, value_id: 2},
    {user_id: 12, value_id: 3},
  ])
};