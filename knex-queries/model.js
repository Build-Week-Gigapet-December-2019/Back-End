const db = require('../config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findByUnique,
  findCol
};

function find(table) {
  return db(table).select('*');
}

// Accepts array of 2 strings [table, column]
function findCol(tcArray) {
  return db(tcArray[0]).select(tcArray[1]);
}

function findBy(filter) {
  return db('parents').where(filter);
}

async function add(parent) {
  const [id] = await db('parents')
    .insert(parent)
    .returning('id');

  await findBy({ id });

  // const parent_return = await db('parents')
  //   .select('id', 'username')
  //   .where({ id })
  //   .first();
  //   return parent_return;
}

function findByUnique(uniqueIdent) {
  return db(uniqueIdent[0])
    .select(uniqueIdent[1])
    .where(uniqueIdent[2])
    .first();
}

// async function add(user) {
//   const [id] = await db('users').insert(user);
//   return findById(id);
// }

// async function add(user) {
//   const [id] = await db('users').insert(user).returning('id');
//   return findById(id);
// }
