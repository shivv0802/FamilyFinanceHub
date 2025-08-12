const FamilyGroupUser = require('../models/familyGroupUser.model');

async function addUserToFamilyGroupRepo(data) {
    try {
        const member = await FamilyGroupUser.create(data);
        return member;
    } catch (error) {
        throw error;
    }
}

async function getUsersByFamilyGroupRepo(familyGroupId) {
    try {
        return await FamilyGroupUser.find({ familyGroupId })
            .populate('userId', 'firstName lastName mobileNumber')
            .populate('familyGroupId', 'groupName');
    } catch (error) {
        throw error;
    }
}

async function getFamilyGroupsByUserRepo(userId) {
    try {
        return await FamilyGroupUser.find({ userId })
            .populate('familyGroupId', 'groupName description');
    } catch (error) {
        throw error;
    }
}

async function updateFamilyGroupUserRepo(id, updateData) {
    try {
     const user = await FamilyGroupUser.findByIdAndUpdate(id, updateData, { new: true });
     console.log("Updated User:", user);
     return user;
    } catch (error) {
        throw error;
    }
}

async function removeUserFromFamilyGroupRepo(id) {
    try {
        return await FamilyGroupUser.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addUserToFamilyGroupRepo,
    getUsersByFamilyGroupRepo,
    getFamilyGroupsByUserRepo,
    updateFamilyGroupUserRepo,
    removeUserFromFamilyGroupRepo
};
