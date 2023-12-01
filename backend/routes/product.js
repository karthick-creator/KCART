const express = require('express');
const { getProducts, newProduct, getSingleProduct } = require('../controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/new').post(newProduct);
router.route('/products/:id').get(getSingleProduct)

module.exports = router