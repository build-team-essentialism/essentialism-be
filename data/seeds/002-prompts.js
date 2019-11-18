
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('prompts').insert([
    {user_id: 1, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 1, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 2, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 2, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 3, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 3, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 4, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 4, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 5, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 5, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 6, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 6, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 7, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 7, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 8, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 8, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 9, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 9, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 10, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 10, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 11, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 11, prompt: "The projects I'm involved in are x, y, z"},

    {user_id: 12, prompt: "I value these values because they have been integrated into my upbringing"},
    {user_id: 12, prompt: "The projects I'm involved in are x, y, z"},
  ])
};
