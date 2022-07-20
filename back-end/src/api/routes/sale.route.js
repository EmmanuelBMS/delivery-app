const express = require('express');

const router = express.Router();
const saleController = require('../controllers/sale');

router
  .post('/', saleController.create)
  .get('/:id', saleController.findById)
  .get('/allsales', saleController.findAllByIdSales);

module.exports = router;