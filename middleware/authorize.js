const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.Salt, function (err, decoded) {
      if (err) {
        console.log('JWT Verification Error', err);
        return res.status(403).send(err);
      } else {
        req.decoded = decoded;
        return next();
      }
    })
  } else {
    res.status(403).json({error: "Token not provided."});
  }
}