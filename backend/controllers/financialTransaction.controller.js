const {
    addFamilyTransactionService,
    getFamilyTransactionsService
} = require('../service/financialTransaction.service');

const BaseController = require('./baseError.controller');
const baseController = new BaseController();

// Create transaction (with category creation if not exists)
async function addFamilyTransaction(req, res, next) {
    try {
        const transaction = await addFamilyTransactionService(req.body);
        return baseController.sendJSONResponse(res, {}, "Transaction created successfully", transaction);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Get all transactions with category details
async function getFamilyTransactions(req, res, next) {
    try {
        const transactions = await getFamilyTransactionsService();
        return baseController.sendJSONResponse(res, {}, "Transactions fetched successfully", transactions);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

module.exports = {
    addFamilyTransaction,
    getFamilyTransactions
};
