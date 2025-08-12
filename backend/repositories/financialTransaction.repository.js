const FamilyTransaction = require('../models/familyTransaction.model');

async function createTransactionRepo(data) {
    try {
        return await FamilyTransaction.create(data);
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}

async function getAllTransactionsRepo() {
    try {
        return await FamilyTransaction.find().populate('category');
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}

module.exports = {
    createTransactionRepo,
    getAllTransactionsRepo
};
