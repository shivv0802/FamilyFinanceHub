const express = require('express');
const router = express.Router();
const {
    addFamilyTransaction,
    getFamilyTransactions
} = require('../controllers/financialTransaction.controller');

router.post('/', addFamilyTransaction);
router.get('/getAll', getFamilyTransactions);

module.exports = router;
