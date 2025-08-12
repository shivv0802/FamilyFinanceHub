const FamilyGroup = require('../models/familyGroup.model');


async function createFamilyGroupRepo(data) {
    try {
        const group = await FamilyGroup.create(data);
        return group;
    } catch (error) {
        throw error;
    }
}

async function getFamilyGroupById(id) {
    try {
        const group = await FamilyGroup.findById(id);
        return group;
    } catch (error) {
        throw error;
    }
}

async function getAllFamilyGroups() {
    try {
        const groups = await FamilyGroup.find();
        return groups;
    } catch (error) {
        throw error;
    }
}

async function updateFamilyGroupRepo(id, updateData) {
    try {
        const updatedGroup = await FamilyGroup.findByIdAndUpdate(id, updateData, { new: true });
        return updatedGroup;
    } catch (error) {
        throw error;
    }
}

async function deleteFamilyGroupRepo(id) {
    try {
        const deletedGroup = await FamilyGroup.findByIdAndDelete(id);
        return deletedGroup;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFamilyGroupRepo,
    getFamilyGroupById,
    getAllFamilyGroups,
    updateFamilyGroupRepo,
    deleteFamilyGroupRepo
};
