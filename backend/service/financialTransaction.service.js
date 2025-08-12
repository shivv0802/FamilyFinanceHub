const BadRequest = require('../error/BadRequest');
const InternalServerError = require('../error/InternalServerError');

const {
    createTransactionRepo,
    getAllTransactionsRepo
} = require('../repositories/financialTransaction.repository');

const {
    findCategoryByNameRepo,
    createCategoryRepo
} = require('../repositories/category.repository');

async function addFamilyTransactionService(data) {
    const {
        userId,
        familyGroupId,
        transactionType,
        amount,
        description,
        paymentMethod,
        categoryName,
        categoryDescription
    } = data;

    // Validation
    if (!userId || !familyGroupId || !transactionType || !amount || !description || !categoryName || !paymentMethod) {
        throw new BadRequest("BadRequest", "All required fields must be provided");
    }

    // Find or create category
    let category = await findCategoryByNameRepo(categoryName);
    if (!category) {
        category = await createCategoryRepo({
            name: categoryName,
            description: categoryDescription
        });

        if (!category) {
            throw new InternalServerError("InternalServerError", "Unable to create category");
        }
    }

    // Create transaction
    const transaction = await createTransactionRepo({
        userId,
        familyGroupId,
        transactionType,
        amount,
        description,
        category: category._id,
        paymentMethod
    });

    if (!transaction) {
        throw new InternalServerError("InternalServerError", "Unable to create transaction");
    }

    return transaction;
}

async function getFamilyTransactionsService() {
    return await getAllTransactionsRepo();
}

module.exports = {
    addFamilyTransactionService,
    getFamilyTransactionsService
};
