const router = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const knex = require('../knex/knex.js');
const DB = require('../database/model.js');
const bcrypt = require('bcryptjs');

// router.use(bodyParser.json());

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
    console.log(slugArray, 'S L U G    A R R A Y');
    const varTable = await DB.findCol(slugArray);

    res.status(200).json(varTable);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/register', async (req, res) => {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);

  creds.password = hash;

  try {
    const userAddSuccess = await DB.add(creds);
    const token = genToken(userAddSuccess);
    res.status(201).json({ userAddSuccess, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await DB.findBy({username}).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      res.status(200).json({ username: user.username, token: token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
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
