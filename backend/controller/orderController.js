const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder = catchAsyncError(async(req,res,next) => {
    const {
        orderItems,
        shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt : Date.now(),
		user : req.user.id
    })

    res.status(200).json({
		success : true,
		order
	})
})

exports.getSingleOrder = catchAsyncError(async(req,res,next) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	if(!order) {
		return next(new ErrorHandler(`Order not found with this ID : ${req.params.id}`, 404))
	}

	res.status(200).json({
		success : true,
		order
	})
})

exports.myOrders = catchAsyncError(async(req,res,next) => {
	const orders = await Order.find({user: req.user.id});

	res.status(200).json({
		success : true,
		order
	})
})

//Admin: get all orders - api/v1/orders

exports.orders = catchAsyncError(async(req,res,next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach(order => {
		totalAmount += order.totalPrice
	});

	res.status(200).json({
		success : true,
		totalAmount,
		order
	})
})

//Admin: Update order /order status - api/v1/order/:id
exports.updateOrder = catchAsyncError(async(req,res,next) => {
	const order = await Order.findById(req.params.id);

	if(order.orderStatus == 'Delivered') {
		return next(new ErrorHandler('Order has been delivered!'))
	}

	order.orderItems.forEach(orderItem => {
		
	}) 
})

