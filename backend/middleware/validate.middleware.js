const { checkSchema, validationResult } = require('express-validator');
const User = require('../models/user.model');
const BadRequest = require('../error/BadRequest');

const validateUserData = [
  checkSchema({
    firstName: {
      isLength: {
        options: { min: 4 },
        errorMessage: 'First Name is required and must be at least 4 characters'
      }
    },
   lastName: {
      isLength: {
        options: { min: 3 },
        errorMessage: 'Last Name is required and must be at least 4 characters'
      }
    },
    mobileNumber: {
      isNumeric: {
        errorMessage: 'Mobile Number must be numeric'
      },
      isLength: {
        options: { min: 10, max: 10 },
        errorMessage: 'Mobile Number must be exactly 10 digits'
      },
      custom: {
        options: async (value) => {
          const user = await User.findOne({ mobileNumber: value });
          if (user) {
            throw new Error('Mobile Number already exists');
          }
          return true;
        }
      }
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 characters'
      }
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      return next(new BadRequest('Bad Request', errorMessages));
    }
    next();
  }
];

module.exports =  validateUserData ;
