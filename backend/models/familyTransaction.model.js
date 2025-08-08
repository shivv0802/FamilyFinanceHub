const mongoose = require('mongoose');

const familyTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    familyGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FamilyGroup'
    },
    transactionType: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
        },
        paymentMethod : {
            type: String,
            enum: ['Cash', 'Card', 'Bank Transfer', 'Other'],
            required: true
        }
}, { timestamps: true });


const FamilyTransaction = mongoose.model('FamilyTransaction', familyTransactionSchema);

module.exports = FamilyTransaction;
