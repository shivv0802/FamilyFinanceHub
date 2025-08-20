const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum : ['Job','Business','Food', 'Transport', 'Entertainment', 'Health', 'Utilities', 'Education', 'Clothing', 'Miscellaneous'],
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;
