const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

const authorize = require('../middleware/authorize');

/* GET users listing. */
router.get('/', authorize, homeController.index);

module.exports = router;
