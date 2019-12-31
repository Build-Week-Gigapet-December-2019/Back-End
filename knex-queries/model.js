const db = require('../db/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findByUnique,
  findCol,
  addEntry,
  addChild,
  removeEntry
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
  const [addedParent] = await db('parents')
    .returning(['id', 'username'])
    .insert(parent);

  return addedParent;
}

function findByUnique(uniqueIdent) {
  return db(uniqueIdent[0])
    .select(uniqueIdent[1])
    .where(uniqueIdent[2])
    .first();
}

async function addEntry(entry) {
  const [addedEntry] = await db('food_entries')
    .returning(['child_id', 'id', 'date'])
    .insert(entry);

  return addedEntry;
}

async function removeEntry(entry) {
  console.log(entry, "ENTRY ENTRY")
  const removedEntry = await db('food_entries')
    .returning(['id', 'date'])
    .where('id', entry )
    .delete();

  return removedEntry;
}

async function addChild(child) {
  const [addedChild] = await db('children')
    .returning(['id', 'name', 'parent_id'])
    .insert(child);

  return addedChild;
}

// async function add(user) {
//   const [id] = await db('users').insert(user);
//   return findById(id);
// }

// async function add(user) {
//   const [id] = await db('users').insert(user).returning('id');
//   return findById(id);
// }
