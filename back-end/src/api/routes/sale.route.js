const express = require('express');

const router = express.Router();
const saleController = require('../controllers/sale');

router
  .post('/', saleController.create)
  .get('/search', saleController.findAllByIdSales)
  .get('/:id', saleController.findById)
  .put('/:id', saleController.update);

module.exports = router;