const catchAsyncError = require('../middlewares/catchAsyncError');
const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

//Get products  -  /api/v1/products
exports.getProducts = async(req,res,next) =>{
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count : products.length,
        products
    })
}

//Create Product   -  /api/v1/products/new
exports.newProduct = catchAsyncError(async(req,res,next) =>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
});

//Get single product - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        // Attempt to find a product by its ID
        const product = await Product.findById(req.params.id);

        // Check if the product exists
        if (!product) {
            // If the product is not found, return an error using the custom ErrorHandler
            return next(new ErrorHandler("Product not found for single product", 400));
        }

        // If the product is found, send a success response with the product details
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        // Handle any unexpected errors that might occur during the process
        // You might want to log the error for debugging purposes
       //console.error(error);

        // Return a generic server error response
        return next(new ErrorHandler("Internal Server Error test", 500));
    }
};


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

exports.createReview = catchAsyncError(async(req,res,next) => {
	const {productId, rating, comment} = req.body;
	
	const review = {
		user : req.user.id,
		rating,
		comment 
	}

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString();
    })

    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment;
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc,review) => {
		return review.rating + acc;
	}, 0) / product.reviews.length;

    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success : true
    })

})

//Get reviews - 
exports.getReviews = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
		success : true,
		reviews : product.reviews
	})
})

//Delete review
exports.deleteReview = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString();
    })

    const numOfReviews = reviews.length;
    let ratings = product.reviews.reduce((acc,review) => {
		return review.rating + acc;
	}, 0) / product.reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success : true
    })
})