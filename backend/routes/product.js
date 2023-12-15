const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/new').post(newProduct);
router.route('/product/:id')
                        .get(getSingleProduct)
                        .put(updateProduct)
                        .delete(deleteProduct)

module.exports = router