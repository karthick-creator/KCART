const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.connect(
    {
        name : {
            type : String,
            required : [true, 'Please enter the name']
        },
        email : {
            type : String,
            required : [true, 'Please enter email'],
            unique : true,
            validate : [validator.isEmail, 'Please enter valid email']
        },
        password : {
            type : String,
            required : [true, 'Please enter password'],
            maxlength : [6, 'Password cannot exceed 6 characters']
        },
        avatar: {
            type : String,
            required: true
        },
        role: {
            
        }
    }
)