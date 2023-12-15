const catchAsyncError = require('../middlewares/catchAsyncError');
const Product = require('../models/productModel');
const apiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

//Get products  -  /api/v1/products
exports.getProducts = async(req,res,next) =>{
    const apiFeatures = new apiFeatures(Product.find(), req.query).search();

    const products = await apiFeatures.query1;
    res.status(200).json({
        success: true,
        count : products.length,
        products
    })
}

//Create Product   -  /api/v1/products/new
exports.newProduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
});

//Get single product - /api/v1/product/:id
exports.getSingleProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){

         return next(new ErrorHandler("Product not found",400));

        // res.status(404).json({
        //     success: false,
        //     message: "Product not found"
        // })
    }
    res.status(201).json({
        success:true,
        product
    })
}

//Update product -  /api/v1/product/:id
exports.updateProduct = async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    const update = await Product.findByIdAndUpdate(product, req.body, {
        new : true,
        runValidators: true
    })
    res.status(200).json({
        success:true,
        update
    })
}

//Delete Product - 
exports.deleteProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    //await product.remove(); -------------------This is not working idk why?
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message: "product was deleted"
    })
}