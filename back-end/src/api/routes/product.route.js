const express = require('express');

const router = express.Router();
const productController = require('../controllers/product');

router.get('/', productController.findAll);
router.get('/:id', productController.findById);

module.exports = router;