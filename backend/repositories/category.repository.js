const Category = require('../models/category.model');

async function findCategoryByNameRepo(name) {
    try {
        return await Category.findOne({ name });
    } catch (error) {
        console.error("Error finding category:", error);
        throw error;
    }
}

async function createCategoryRepo(data) {
    try {
        return await Category.create(data);
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

module.exports = {
    findCategoryByNameRepo,
    createCategoryRepo
};
