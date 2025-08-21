const Unauthorized = require('../error/Unauthorized');

async function authorizeFamilyAdmin(req, res, next) {
    try {
        const userRole = req.user.role; // role JWT se aaya hai (req.user me decode hua token)

        if (userRole !== "admin") {
            return next(new Unauthorized("Unauthorized", "You are not authorized to perform this action"));
        }

        // agar admin hai toh allow karo
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorizeFamilyAdmin;
