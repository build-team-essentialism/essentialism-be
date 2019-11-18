const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Jane', password: bcrypt.hashSync("12345", 10)},
    {username: 'Sherlock', password: bcrypt.hashSync("12345", 10)},
    {username: 'James', password: bcrypt.hashSync("12345", 10)},
    {username: 'Vivaldi', password: bcrypt.hashSync("12345", 10)},
    {username: 'Luis', password: bcrypt.hashSync("12345", 10)},
    {username: 'Esther', password: bcrypt.hashSync("12345", 10)},
    {username: 'Serena', password: bcrypt.hashSync("12345", 10)},
    {username: 'Eve', password: bcrypt.hashSync("12345", 10)},
    {username: 'Elizabeth', password: bcrypt.hashSync("12345", 10)},
    {username: 'Katie', password: bcrypt.hashSync("12345", 10)},
    {username: 'Adam', password: bcrypt.hashSync("12345", 10)},
    {username: 'Chris', password: bcrypt.hashSync("12345", 10)}
  ]);
}