exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('parents').insert([
        { username: 'ron', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'lenny', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'karen', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'rose', password: 'CANT LOGIN SO DONT TEST WITH ME' }
      ]);
    });
};
