const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const middleware = require('../middleware/user.middleware');

router.post('/', middleware.create, userController.create);
router.get('/sellers', userController.findAll);

module.exports = router;
