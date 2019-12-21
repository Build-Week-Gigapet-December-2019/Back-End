const db = require('../knex/knex.js');

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
  const [id] = await db('parents').insert(parent);

  return find('parents')
    .where({ id })
    .first();
}

function findByUnique(uniqueIdent) {
  return db(uniqueIdent[0])
    .select(uniqueIdent[1])
    .where(uniqueIdent[2])
    .first();
}
