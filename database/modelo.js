const db = require('./dbConfig.js');

module.exports = {
  add,
  findParentBy,
  findById
  
};


function findParentBy(filter) {
  return db('parents').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

// Post a new entry to any of the tables by using the table's name as a param, and the entry as the body

// function add(postbody) {
//   return db(parents)
//     .insert(postbody)
//     .then((posted) => {
//       return posted
//     });
// }

function add(user) {
   db('parents').returning('username').insert(user);

  // return findById(id);
}
// function find() {
//   return db('users').select('id', 'username', 'password');
// }

// function findBy(filter) {
//   return db('users').where(filter);
// }

// async function add(user) {
//   const [id] = await db('users').insert(user);

//   return findById(id);
// }

// function findById(id) {
//   return db('users')
//     .where({ id })
//     .first();
// }