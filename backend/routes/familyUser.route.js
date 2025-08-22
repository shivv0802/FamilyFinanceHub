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


//only admin nd logged in user can create and update data  but anyone who is logged in can view the user of family

router.post('/',authenticateUserData,authorizeFamilyAdmin, addUserToFamilyGroup) 
router.get('/group/:familyGroupId',authenticateUserData, getUsersByFamilyGroup)//give user of a family group by family id
router.get('/user/:userId',authenticateUserData, getFamilyGroupsByUser)
router.put('/:id', authenticateUserData,authorizeFamilyAdmin, updateFamilyGroupUser)
router.delete('/:id',authenticateUserData, authorizeFamilyAdmin, removeUserFromFamilyGroup);

module.exports = router;
