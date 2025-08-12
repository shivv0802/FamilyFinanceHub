const BadRequest = require('../error/BadRequest');
const NotFound = require('../error/NotFound');
const InternalServerError = require('../error/InternalServerError');

const {
    addUserToFamilyGroupRepo,
    getUsersByFamilyGroupRepo,
    getFamilyGroupsByUserRepo,
    updateFamilyGroupUserRepo,
    removeUserFromFamilyGroupRepo
} = require('../repositories/familyUser.repository');

async function addUserToFamilyGroupService({ userId, familyGroupId, isAdmin }) {
    if (!userId || !familyGroupId) {
        throw new BadRequest("BadRequest", "userId and familyGroupId are required");
    }

    const member = await addUserToFamilyGroupRepo({ userId, familyGroupId, isAdmin });
    if (!member) {
        throw new InternalServerError("InternalServerError", "Unable to add user to family group");
    }
    return member;
}

async function getUsersByFamilyGroupService(familyGroupId) {
    if (!familyGroupId) throw new BadRequest("BadRequest", "familyGroupId is required");

    const members = await getUsersByFamilyGroupRepo(familyGroupId);
    return members;
}

async function getFamilyGroupsByUserService(userId) {
    if (!userId) throw new BadRequest("BadRequest", "userId is required");

    const groups = await getFamilyGroupsByUserRepo(userId);
    return groups;
}

async function updateFamilyGroupUserService(id, updateData) {
    const updatedMember = await updateFamilyGroupUserRepo(id, updateData);
    if (!updatedMember) throw new NotFound("NotFound", "Member not found in family group");
    return updatedMember;
}

async function removeUserFromFamilyGroupService(id) {
    const deleted = await removeUserFromFamilyGroupRepo(id);
    if (!deleted) throw new NotFound("NotFound", "Member not found or already removed");
    return deleted;
}

module.exports = {
    addUserToFamilyGroupService,
    getUsersByFamilyGroupService,
    getFamilyGroupsByUserService,
    updateFamilyGroupUserService,
    removeUserFromFamilyGroupService
};
