const {
    addUserToFamilyGroupService,
    getUsersByFamilyGroupService,
    getFamilyGroupsByUserService,
    updateFamilyGroupUserService,
    removeUserFromFamilyGroupService
} = require('../service/familyUser.service');

const BaseController = require('./baseError.controller');
const baseController = new BaseController();

// Add a user to a family group
async function addUserToFamilyGroup(req, res, next) {
    try {
        const data = {
            userId: req.body.userId,
            familyGroupId: req.body.familyGroupId,
            isAdmin: req.body.isAdmin || false
        };

        const member = await addUserToFamilyGroupService(data);
        return baseController.sendJSONResponse(res, {}, "User added to family group successfully", member);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Get all users in a family group
async function getUsersByFamilyGroup(req, res, next) {
    try {
        const members = await getUsersByFamilyGroupService(req.params.familyGroupId);
        return baseController.sendJSONResponse(res, {}, "Family group members retrieved successfully", members);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Get all family groups for a user
async function getFamilyGroupsByUser(req, res, next) {
    try {
        const groups = await getFamilyGroupsByUserService(req.params.userId);
        console.log("User's Family Groups:", groups);
        return baseController.sendJSONResponse(res, {}, "User's family groups retrieved successfully", groups);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Update role or membership info
async function updateFamilyGroupUser(req, res, next) {
    try {
        
        const updated = await updateFamilyGroupUserService(req.params.id, req.body);
        return baseController.sendJSONResponse(res, {}, "Family group member updated successfully", updated);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Remove user from a family group
async function removeUserFromFamilyGroup(req, res, next) {
    try {
        const deleted = await removeUserFromFamilyGroupService(req.params.id);
        return baseController.sendJSONResponse(res, {}, "User removed from family group successfully", deleted);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

module.exports = {
    addUserToFamilyGroup,
    getUsersByFamilyGroup,
    getFamilyGroupsByUser,
    updateFamilyGroupUser,
    removeUserFromFamilyGroup
};
