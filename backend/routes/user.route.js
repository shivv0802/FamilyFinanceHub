const express = require('express');
const router = express.Router()
const authenticateUserData = require('../middleware/authenticate.midddleware')

const validateUserData = require('../middleware/validate.middleware');
const {searchUsers,signup, loginUser} = require('../controllers/user.controller')


router.post('/signup', validateUserData, signup)
router.post('/login', loginUser)
router.get("/search", authenticateUserData, searchUsers);

module.exports = router
