const express = require('express');
const router = express.Router()

const validateUserData = require('../middleware/validate.middleware');
const {signup, loginUser} = require('../controllers/user.controller')


router.post('/signup', validateUserData, signup)
router.post('/login', loginUser)

module.exports = router
