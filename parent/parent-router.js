<<<<<<< HEAD
// simeplcode-api/api/routes/users.js
// Include express
const express = require("express");
=======
// POSTMAN TESTING FORMAT!!!!!!
//

// Authorization Type: API Key
// Key: authorization
// Value: token string WITHOUT ANY KINDA QUOTES!!!!
//
//

const express = require('express');
>>>>>>> empty-branch

// Include express router middleware
const router = express.Router();

<<<<<<< HEAD
// Add a 'get' method to express router for our test route
router.get("/", function(req, res) {
  res.send({ msg: "Hello World" });
});

// Exports the router object
module.exports = router;
=======
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js') || require('./secrets.js');
const DB = require('../knex-queries/model.js');
const bcrypt = require('bcryptjs');

// Add a 'get' method to express router for our test route
router.get('/', function(req, res) {
  res.send({ msg: 'Hello World' });
});

router.post('/food', async (req, res) => {
  const newEntry = req.body;
  console.log(newEntry, 'NEW ENTRY HERE');
  try {
    const addedEntry = await DB.addEntry(newEntry);
    console.log(addedEntry);
    res.status(201).json(addedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/food/:id', async (req, res) => {
  const entry = req.params.id;

  try {
    const removedEntry = await DB.removeEntry(entry);
    res.status(204).json(removedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/child', async (req, res) => {
  const newChild = req.body;

  try {
    const addedChild = await DB.addChild(newChild);
    res.status(201).json(addedChild);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
>>>>>>> empty-branch
