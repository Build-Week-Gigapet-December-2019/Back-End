const db = require('../db/dbConfig.js');

module.exports = {
  
  find,  
  findByUnique,
  findCol,
  addUser,
  login,
  addChild,
  getChildren,
  getEntries,
  addEntry,
  editEntry,
  removeEntry
  // editEntry
};

function find(table) {
  return db(table).select('*');
}

async function getChildren(parentId) {
  const children = await db('children')
  .returning('*')
  .where('parent_id', parentId);

  return children;
}

async function getEntries(childId) {
  const entries = await db('food_entries')
  .returning('*')
  .where('child_id', childId);

  return entries;
}

// Accepts array of 2 strings [table, column]
function findCol(tcArray) {
  return db(tcArray[0]).select(tcArray[1]);
}

function login(filter) {
  return db('parents').where(filter);
}

async function addUser(parent) {
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

async function addEntry(id, entry) {
  const newEntry = {...entry, child_id:id};
  const [addedEntry] = await db('food_entries')
    .returning(['child_id', 'id', 'date'])
    .insert(newEntry);

  return addedEntry;
}

async function removeEntry(entrynum) {
  console.log(entrynum, "ENTRY ENTRY")
  const removedEntry = await db('food_entries')
    .returning(['id', 'date'])
    .where('id', entrynum )
    .delete();

  return removedEntry;
}

async function editEntry(id, body) {
  const editedEntry = await db('food_entries')
    .where('id', id )
    .update(body, ['*']);

  return editedEntry[0];
}

async function addChild(child) {
  const [addedChild] = await db('children')
    .returning(['id', 'name', 'parent_id'])
    .insert(child);

  return addedChild;
}

// async function addChild(child) {
//   const [addedChild] = await db('children')
//     .where('id', )
//     .returning(['id', 'name', 'parent_id'])
//     .insert(child);

//   return addedChild;
// }

// async function add(user) {
//   const [id] = await db('users').insert(user);
//   return findById(id);
// }

// async function add(user) {
//   const [id] = await db('users').insert(user).returning('id');
//   return findById(id);
// }
