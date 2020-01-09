// POSTMAN TESTING FORMAT!!!!!!
//

// Authorization Type: API Key
// Key: authorization
// Value: token string WITHOUT ANY KINDA QUOTES!!!!
//
//

const express = require('express');

// Include express router middleware
const router = express.Router();
const DB = require('../knex-queries/model.js');

// Register a child to be linked to logged in parent's account

router.post('/child', async (req, res) => {
  const newChild = req.body;

  try {
    const addedChild = await DB.addChild(newChild);
    res.status(201).json(addedChild);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add food entry by child Id

router.post('/food/:childId', async (req, res) => {
  const newEntry = req.body;
  const { childId } = req.params;
  console.log(newEntry, 'NEW ENTRY HERE', childId);
  try {
    const addedEntry = await DB.addEntry(childId, newEntry);
    console.log(addedEntry);
    res.status(201).json(addedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update food entry by entry Id

router.put('/food/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedEntry = await DB.editEntry(id, body);
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete food entry by entry Id

router.delete('/food/:id', async (req, res) => {
  const entry = req.params.id;

  try {
    const removedEntry = await DB.removeEntry(entry);
    res.status(204).json(removedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all food entries from all children belonging to a parent by Parent Id

router.get('/food/parent/:parentId', async (req, res) => {
  const parentId = req.params.parentId;
  console.log(parentId, 'parentID');
  try {
    const children = await DB.getChildren(parentId);

    const childrenIds = children.map((child) => {
      return child.id;
    });
    const entries = await DB.getEntries(childrenIds);
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Gets all children associated with Parent by ParentId

router.get('/children/:parentId', async (req, res) => {
  const parent = req.params.parentId;

  try {
    const children = await DB.getChildren(parent);
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
