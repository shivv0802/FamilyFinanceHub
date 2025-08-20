const express = require('express');
const router = express.Router();

const authenticateUserData = require('../middleware/authenticate.midddleware')
const authorizeFamilyAdmin = require('../middleware/authorizeFamilyAdmin')

const {
    createFamilyGroup,
    getFamilyGroup,
    getAllFamilyGroups,
    updateFamilyGroup,
    deleteFamilyGroup
} = require('../controllers/familyGroup.controller');


router.post('/', authenticateUserData, createFamilyGroup);


router.get('/:id', authenticateUserData, getFamilyGroup)


router.get('/', authenticateUserData, getAllFamilyGroups)


router.put('/:id', authenticateUserData, authorizeFamilyAdmin, updateFamilyGroup)


router.delete('/:id',authenticateUserData,authorizeFamilyAdmin, deleteFamilyGroup)

module.exports = router;
