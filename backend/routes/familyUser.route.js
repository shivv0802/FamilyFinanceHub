const express = require('express');
const router = express.Router();


const {
    addUserToFamilyGroup,
    getUsersByFamilyGroup,
    getFamilyGroupsByUser,
    updateFamilyGroupUser,
    removeUserFromFamilyGroup
} = require('../controllers/familyUser.controller')


router.post('/',addUserToFamilyGroup)
router.get('/group/:familyGroupId', getUsersByFamilyGroup);
router.get('/user/:userId', getFamilyGroupsByUser)
router.put('/:id',  updateFamilyGroupUser)
router.delete('/:id', removeUserFromFamilyGroup);

module.exports = router;
