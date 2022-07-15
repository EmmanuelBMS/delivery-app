const express = require('express');

const router = express.Router();
const saleController = require('../controllers/sale');

router.post('/', saleController.create);
router.get('/:id', saleController.findById);

module.exports = router;