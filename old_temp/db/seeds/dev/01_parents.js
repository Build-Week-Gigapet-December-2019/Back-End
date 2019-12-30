exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('parents').insert([
        { username: 'Ron', password: '123' },
        { username: 'Lenny', password: '765' },
        { username: 'Karen', password: 'abc' },
        { username: 'Rose', password: 'sneaky' }
      ]);
    });
};
