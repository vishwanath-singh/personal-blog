// src/database/config.js
require('ts-node/register');
const config = require('../database/config.ts');
module.exports = config.default || config;
