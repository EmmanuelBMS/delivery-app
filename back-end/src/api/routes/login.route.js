const express = require('express');

const router = express.Router();
const loginController = require('../controllers/login');
const middleware = require('../middleware/login.middleware');

router.post('/', middleware.create, loginController.login);

module.exports = router;