exports.up = function(knex) {
  return knex.schema
    .createTable('parents', (tbl) => {
      tbl.increments('id').primary();
      tbl
        .string('username')
        .unique()
        .notNullable();
      tbl.string('password').notNullable();
    })
    .createTable('children', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl
        .integer('parent_id')
        .references('id')
        .inTable('parents')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('parent_2_id')
        .references('id')
        .inTable('parents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('food_entries', (tbl) => {
      tbl.increments('id').primary();
      tbl.date('date');
      tbl.integer('dairy');
      tbl.integer('fruits');
      tbl.integer('grains');
      tbl.integer('proteins');
      tbl.integer('vegetables');
      tbl.integer('treats');
      tbl
        .integer('child_id')
        .references('id')
        .inTable('children');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('food_entries')
    .dropTableIfExists('children')
    .dropTableIfExists('parents');
};