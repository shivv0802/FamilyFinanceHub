const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

module.exports = User;