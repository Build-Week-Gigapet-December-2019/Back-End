
// When storing a date value, PostgreSQL uses the  yyyy-mm-dd format e.g., 2000-12-31. It also uses this format for inserting data into a date column.

// If you create a table that has a DATE column and you want to use the current date as the default value for the column, you can use the CURRENT_DATE after the DEFAULT keyword.

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food_entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('food_entries').insert([
        {date:'2019-12-19', dairy:'2', fruits: '2', proteins: '1', treats: '4', child_id: '1'},
        {date:'2019-12-19', dairy:'1', fruits: '6', proteins: '9', treats: '7', child_id: '2'},
        {date:'2019-12-19', dairy:'3', fruits: '4', proteins: '2', treats: '6', child_id: '4'},
        {date:'2019-12-19', dairy:'3', fruits: '4', proteins: '2', treats: '1', child_id: '1'},
        {date:'2019-12-19', dairy:'3', fruits: '5', proteins: '2', treats: '1', child_id: '3'}
        
      ]);
    });
};
// .createTable('food_entries', (tbl) => {
//   tbl.increments('id').primary();
//   tbl.date('date');
//   tbl.integer('dairy');
//   tbl.integer('fruits');
//   tbl.integer('grains');
//   tbl.integer('proteins');
//   tbl.integer('vegetables');
//   tbl.integer('treats');
//   tbl
//     .integer('child_id')
//     .references('id')
//     .inTable('children');
// });