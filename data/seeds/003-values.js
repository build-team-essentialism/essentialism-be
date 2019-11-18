
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').insert([
    {name: "Balance"},
    {name: "Family"},
    {name: "Career Success"},
    {name: "Hospitality"},
    {name: "Fairness"},
    {name: "Reason"},
    {name: "Friendship"},
    {name: "Gratitude"},
    {name: "Growth"},
    {name: "Structure"},
    {name: "Status"},
    {name: "Courage"},
    {name: "Knowledge"},
    {name: "Optimism"},
    {name: "Endurance"},
    {name: "Wisdom"},
    {name: "Trust"},
    {name: "Dedication"},
    {name: "Meaning"},
    {name: "Justice"},
    {name: "Individuality"},
    {name: "Adaptability"},
  ])
};
