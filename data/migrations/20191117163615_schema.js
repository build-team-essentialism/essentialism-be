
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
    .createTable('values', tbl => {
        tbl.increments()
        tbl
            .string('name').notNullable().unique()
    })
    .createTable('user_values', tbl => {
        tbl.increments()
        tbl
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl
            .integer('value_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('values')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.unique(['user_id', 'value_id'])
    })
    .createTable('top_values', tbl => {
        tbl.increments()
        tbl
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl
            .integer('value_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('values')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.unique(['user_id', 'value_id'])
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('top_values')
    .dropTableIfExists('user_values')
    .dropTableIfExists('promps')
    .dropTableIfExists('values')
    .dropTableIfExists('users')
};
