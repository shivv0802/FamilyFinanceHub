// Signup, login logic

const { createOneUserService, loginOneUserService } = require('../service/user.service');




const BaseController = require('./baseError.controller'); // Assuming you have a base controller for error handling
const baseController = new BaseController();




async function signup(req, res, next) {
  try {
    const newUser = await createOneUserService(req.body);
    return baseController.sendJSONResponse( res,{},"Signup successful",newUser );
  } catch (error) {
    return baseController.sendErrorResponse(res, error); // Use the base controller to handle errors
  }
}

async function loginUser(req,res ,next) {
  try {
    const token = await loginOneUserService(req.body);
   

    return baseController.sendJSONResponse( res,{},"Login successful",token );
  } catch (error) {

      next(error)
     // Pass the error to the next middleware for centralized error handling
  }
}


const User = require("../models/user.model");
const FamilyGroupUser = require("../models/familyGroupUser.model");

async function searchUsers(req, res, next){
  try {
    const { search, excludeIds } = req.query;

    // Search query
    const regex = search ? new RegExp(search, "i") : null;
    const query = regex
      ? { $or: [{ firstName: regex }, { lastName: regex }, { mobileNumber: regex }] }
      : {};

    // Exclude IDs (comma separated from frontend)
    let excludeArray = [];
    if (excludeIds) {
      excludeArray = excludeIds.split(",").map((id) => id.trim());
    }

    const matchingUsers = await User.find({
      ...query,
      _id: { $nin: excludeArray }
    }).select("_id firstName lastName mobileNumber");

    res.json({ data: matchingUsers });
  } catch (err) {
    next(err);
  }
};

 


module.exports = {
    signup,
    loginUser,
    searchUsers
};
