const router = require('express').Router();
const jwt = require('jsonwebtoken');
const DB = require('../knex-queries/model.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
if (fs.existsSync('config/secrets.js')) {
  var secret = require('../config/secrets.js');
} else {
  var secret = { jwtSecret: process.env.JWT_SECRET };
}

router.post('/register', async (req, res) => {
  const creds = req.body;
  if (!(creds.username && creds.password)) {
    res.status(406).json({ error: 'Valid Username and Password Required' });
  } else {
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;
    try {
      const userAddSuccess = await DB.add(creds);
      res.status(201).json(userAddSuccess);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('a');
    if (!(req.body.username && req.body.password)) {
      console.log('b');
      res.status(406).json({ error: 'Invalid Username or Password' });
    } else {
      console.log('c');
      let { username, password } = req.body;
      console.log('d');
      const user = await DB.login({ username }).first();
      console.log('e');
      bcrypt.compareSync(password, user.password);
      console.log('f');
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('g');
        const token = await genToken(user);
        res.status(202).json({ id: user.id, username: user.username, token });
      } else {
        console.log('h');
        res.status(406).json({ message: 'Invalid Credentials' });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

async function genToken(user) {
  console.log('i');
  const payload = {
    userid: user.id,
    username: user.username
  };
  console.log('j');
  const options = { expiresIn: '2h' };
  console.log('k');
  const token = jwt.sign(payload, secret.jwtSecret, options);
  console.log('l');
  return token;
}
module.exports = router;
