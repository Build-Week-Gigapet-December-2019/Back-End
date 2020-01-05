const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const config = require('../db/dbConfig.js');
const authenticate = require('../auth/auth-middleware.js');
const authRouter = require('../auth/auth-router.js');
const parentRouter = require('../parent/parent-router');
// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('../knexfile')[environment]; 
// const db = require('knex')(configuration); // connect to DB via knex using env's settings
server.use(config);
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/parents', authenticate, parentRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;
