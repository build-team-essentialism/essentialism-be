
exports.up = function(knex) {
  return knex.schema.table('pillars', tbl => {
      tbl.boolean('top').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.table('pillars', tbl => {
      tbl.dropColumn('top')
  })
};
