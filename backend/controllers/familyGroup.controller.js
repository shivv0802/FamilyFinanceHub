const { 
    createOneFamilyGroupService,
    getOneFamilyGroupService,
    getAllFamilyGroupsService,
    updateOneFamilyGroupService,
    deleteOneFamilyGroupService
} = require('../service/familyGroup.service');

const BaseController = require('./baseError.controller');
const baseController = new BaseController();



async function createFamilyGroup(req, res, next) {
    try {
        const data = {

            groupName: req.body.groupName,
            description: req.body.description
        };

        const newGroup = await createOneFamilyGroupService(data)
        return baseController.sendJSONResponse(res, {}, "Family group created successfully", newGroup)
    } catch (error) {
        return baseController.sendErrorResponse(res, error)
    }
}

// Get One Family Group
async function getFamilyGroup(req, res, next) {
    try {
        const group = await getOneFamilyGroupService(req.params.id)
        return baseController.sendJSONResponse(res, {}, "Family group fetched successfully", group)
    } catch (error) {
        return baseController.sendErrorResponse(res, error)
    }
}

// Get All Family Groups
async function getAllFamilyGroups(req, res, next) {
    try {
        const groups = await getAllFamilyGroupsService();
        return baseController.sendJSONResponse(res, {}, "Family groups fetched successfully", groups);
    } catch (error) {
        return baseController.sendErrorResponse(res, error)
    }
}

// Update Family Group
async function updateFamilyGroup(req, res, next) {
    try {
        const data = {
            groupName: req.body.groupName,
            description: req.body.description
        }
        const updatedGroup = await updateOneFamilyGroupService(req.params.id, data)
        return baseController.sendJSONResponse(res, {}, "Family group updated successfully", updatedGroup)
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

// Delete Family Group
async function deleteFamilyGroup(req, res, next) {
    try {
        const deletedGroup = await deleteOneFamilyGroupService(req.params.id);
        return baseController.sendJSONResponse(res, {}, "Family group deleted successfully", deletedGroup);
    } catch (error) {
        return baseController.sendErrorResponse(res, error);
    }
}

module.exports = {
    createFamilyGroup,
    getFamilyGroup,
    getAllFamilyGroups,
    updateFamilyGroup,
    deleteFamilyGroup
};
