const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const db = require('./db');

const app = express();

if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(logger('combined')); //'combined' outputs the Apache style LOGs
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./routes/users');
const pages = require('./routes/pages');

app.use('/auth', users);
app.use('/', pages);

module.exports = app;
