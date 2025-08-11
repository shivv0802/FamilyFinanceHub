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
    return baseController.sendErrorResponse(res, error);  // Pass the error to the next middleware for centralized error handling
  }
}



module.exports = {
    signup,
    loginUser
};
