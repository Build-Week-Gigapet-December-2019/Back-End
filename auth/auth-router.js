const router = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secrets = 
// require('../config/secrets.js') || 
require('./secrets.js');
const DB = require('../knex-queries/model.js');
const bcrypt = require('bcryptjs');

router.post('/addFoodEntry', async (req, res) => {
  const newEntry = req.body;
  try {
    const addedEntry = await DB.addEntry(newEntry);
    res.status(200).json(addedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/servertest', (req, res) => {
  res.status(200).json('Server is working, boss!');
});

router.get('/:table', async (req, res) => {
  try {
    const varTable = await DB.find(req.params.table);

    res.status(200).json(varTable);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:table/:column', async (req, res) => {
  try {
    const slugArray = [req.params.table, req.params.column];
    const varTable = await DB.findCol(slugArray);

    res.status(200).json(varTable);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/register', async (req, res) => {
  const creds = req.body;
  if (!(creds.username && creds.password)) {
    res.status(406).json({ error: 'Valid Username and Password Required' });
  } else {
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    try {
      const userAddSuccess = await DB.add(creds);
      res.status(201).json( userAddSuccess );
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    if (!(req.body.username && req.body.password )) {
      res.status(406).json({ error: 'Invalid Username or Password' });
    } else {
      let { username, password } = req.body;
      const user = await DB.findBy({ username }).first();
      bcrypt.compareSync(password, user.password);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(202).json({ id: user.id, username: user.username, token });
      } else {
        res.status(406).json({ message: 'Invalid Credentials' });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = { expiresIn: '2h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}
module.exports = router;
