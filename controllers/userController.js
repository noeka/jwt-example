const User = require('../models/User');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  create: (req, res, next) => {
    User.count({ email: req.body.email }, (err, count) => {
      if (count > 0) {
        res.status(409).json({ error: "Email already exists!" });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
          }).then((user) => {
            token = jwt.sign({ user: user.id }, config.Salt, { expiresIn: '1h' });

            res.status(201).json({
              message: "User successfully created!", 
              user: { 
                username: user.username, 
                email: user.email,
                token: token
              } 
            })
          }).catch((err) => {
            res.status(500).json({ error: err.message })
          })
        });
      }
    })
  }

}