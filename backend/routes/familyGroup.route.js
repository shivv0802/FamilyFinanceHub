const express = require('express');
const router = express.Router();

const {
    createFamilyGroup,
    getFamilyGroup,
    getAllFamilyGroups,
    updateFamilyGroup,
    deleteFamilyGroup
} = require('../controllers/familyGroup.controller');

// Create a family group
router.post('/', createFamilyGroup);

// Get one family group by ID
router.get('/:id', getFamilyGroup);

// Get all family groups
router.get('/', getAllFamilyGroups);

// Update family group
router.put('/:id', updateFamilyGroup);

// Delete family group
router.delete('/:id', deleteFamilyGroup);

module.exports = router;
