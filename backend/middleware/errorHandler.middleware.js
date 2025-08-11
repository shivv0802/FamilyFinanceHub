const GeneralError = require('../error/GeneralError');
const BaseController = require('../controllers/baseError.controller')
const basecontroller = new BaseController();
const errorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
 
    return res.status(err.statusCode).json({ code: err.statusCode,
      message: err.message,
      error: err.detail });
  }
  


  
  return res.status(500).json({code: err.statusCode,message: "Internal Server Error", error: "Internal Server Error" });
};

module.exports = errorHandler;