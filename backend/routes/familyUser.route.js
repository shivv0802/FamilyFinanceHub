const express = require('express');
const router = express.Router();
const authenticateUserData = require('../middleware/authenticate.midddleware')
const authorizeFamilyAdmin = require('../middleware/authorizeFamilyAdmin')

const {
    addUserToFamilyGroup,
    getUsersByFamilyGroup,
    getFamilyGroupsByUser,
    updateFamilyGroupUser,
    removeUserFromFamilyGroup
} = require('../controllers/familyUser.controller')


router.post('/',authenticateUserData,authorizeFamilyAdmin, addUserToFamilyGroup)
router.get('/group/:familyGroupId',authenticateUserData, getUsersByFamilyGroup)
router.get('/user/:userId',authenticateUserData, getFamilyGroupsByUser)
router.put('/:id', authenticateUserData,authorizeFamilyAdmin, updateFamilyGroupUser)
router.delete('/:id',authenticateUserData, authorizeFamilyAdmin, removeUserFromFamilyGroup);

module.exports = router;
