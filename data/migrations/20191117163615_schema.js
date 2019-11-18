
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl
            .string('username').unique().notNullable()
        tbl
            .string('password').notNullable()
    })
    .createTable('prompts', tbl => {
        tbl.increments()
        tbl
            .string('prompt').notNullable()
        tbl
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('pillars', tbl => {
        tbl.increments()
        tbl
            .string('pillar').notNullable()
        tbl
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('prompts')
    .dropTableIfExists('pillars')
    .dropTableIfExists('users')
};
