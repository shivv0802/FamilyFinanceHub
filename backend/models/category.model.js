const mongoose = require('mongoose')
const { dropSearchIndex } = require('./auth.model')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        enum : ['Food', 'Transport', 'Entertainment', 'Health', 'Utilities', 'Education', 'Clothing', 'Miscellaneous'],
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;