const User = require('../models/user.model');

async function createUserRepo(data) {
  try {
  
    const user = await User.create(data);
    
    return user;
  } catch (error) {
   
    throw error; // let the real error bubble up
  }
}

async function getUserByNumber(mobileNumber) {
    try {
       const user = await User.findOne({mobileNumber});
    
      return user;  
       
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUserRepo,
    getUserByNumber
    };  
