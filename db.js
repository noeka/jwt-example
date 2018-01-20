const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.DBHost);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;