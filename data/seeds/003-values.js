
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').insert([
    {value: "Balance"},
    {value: "Family"},
    {value: "Career Success"},
    {value: "Hospitality"},
    {value: "Fairness"},
    {value: "Reason"},
    {value: "Friendship"},
    {value: "Gratitude"},
    {value: "Growth"},
    {value: "Structure"},
    {value: "Status"},
    {value: "Courage"},
    {value: "Knowledge"},
    {value: "Optimism"},
    {value: "Endurance"},
    {value: "Wisdom"},
    {value: "Trust"},
    {value: "Dedication"},
    {value: "Meaning"},
    {value: "Justice"},
    {value: "Individuality"},
    {value: "Adaptability"},
  ])
};
