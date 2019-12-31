const knex = require('knex');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js');
// const db = 
const db = knex(config.development);
module.exports = db;

