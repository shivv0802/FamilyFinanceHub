const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authenticate.midddleware');

const {
    addUserToFamilyGroup,
    getUsersByFamilyGroup,
    getFamilyGroupsByUser,
    updateFamilyGroupUser,
    removeUserFromFamilyGroup
} = require('../controllers/familyUser.controller');

// Protected routes
router.post('/',addUserToFamilyGroup);
router.get('/group/:familyGroupId', getUsersByFamilyGroup);
router.get('/user/:userId', getFamilyGroupsByUser);
router.put('/:id',  updateFamilyGroupUser);
router.delete('/:id', removeUserFromFamilyGroup);

module.exports = router;
