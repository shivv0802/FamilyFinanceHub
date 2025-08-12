const BadRequest = require('../error/BadRequest');
const InternalServerError = require('../error/InternalServerError');
const NotFound = require('../error/NotFound');

const { 
    createFamilyGroupRepo, 
    getFamilyGroupById, 
    getAllFamilyGroups, 
    updateFamilyGroupRepo, 
    deleteFamilyGroupRepo 
} = require('../repositories/familyGroup.repository');


async function createOneFamilyGroupService({ groupId, groupName, description }) {
    if (!groupId || !groupName) {
        throw new BadRequest("BadRequest", "groupId and groupName are required");
    }

    const group = await createFamilyGroupRepo({ groupId, groupName, description });
    if (!group) {
        throw new InternalServerError("InternalServerError", "Failed to create family group");
    }
    return group;
}

async function getOneFamilyGroupService(id) {
    const group = await getFamilyGroupById(id);
    if (!group) throw new NotFound("NotFound", "Family group not found");
    return group;
}

async function getAllFamilyGroupsService() {
    return await getAllFamilyGroups();
}

async function updateOneFamilyGroupService(id, updateData) {
    const updatedGroup = await updateFamilyGroupRepo(id, updateData);
    if (!updatedGroup) throw new NotFound("NotFound", "Unable to update - Family group not found");
    return updatedGroup;
}

async function deleteOneFamilyGroupService(id) {
    const deletedGroup = await deleteFamilyGroupRepo(id);
    if (!deletedGroup) throw new NotFound("NotFound", "Unable to delete - Family group not found");
    return deletedGroup;
}

module.exports = {
    createOneFamilyGroupService,
    getOneFamilyGroupService,
    getAllFamilyGroupsService,
    updateOneFamilyGroupService,
    deleteOneFamilyGroupService
};
