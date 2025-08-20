const FamilyGroupUser = require('../models/familyGroupUser.model')
const Unauthorized = require('../error/Unauthorized')

async function authorizeFamilyAdmin(req, res, next) {
    try {
        const familyGroupId = req.params.id;
        const userId = req.user._id 
        if (!familyGroupId) {
            return next(new Unauthorized("Unauthorized", "Family group ID is required"))
        }
        const checkUserFamilyGroup = await FamilyGroupUser.findOne({
            userId, familyGroupId
        })
        console.log("Check User Family Group:", checkUserFamilyGroup)
        if (!checkUserFamilyGroup || !checkUserFamilyGroup.isAdmin) {
            return next(new Unauthorized("Unauthorized", "You are not authorized to perform this action"))
        }
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = authorizeFamilyAdmin