const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(isAuthenticatedUser ,getProducts);
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'), newProduct);
router.route('/product/:id')
                        .get(getSingleProduct)
                        .put(updateProduct)
                        .delete(deleteProduct)

module.exports = router