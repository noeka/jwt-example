const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  index: (req, res, next) => {
    res.status(200).json({'message': 'Welcome to the user protected area!'});
  }

}