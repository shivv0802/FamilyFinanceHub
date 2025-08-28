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
        required: true,
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    },

    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    paymentMethod: {
  type: String,
  enum: ['Cash', 'Credit Card', 'Bank Transfer', 'Other'],
  required: true,
  set: v => {
    if (!v) return v;
    return v
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

}, { timestamps: true });


const FamilyTransaction = mongoose.model('FamilyTransaction', familyTransactionSchema);

module.exports = FamilyTransaction;
