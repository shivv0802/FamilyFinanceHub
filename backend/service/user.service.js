const BadRequest = require('../error/BadRequest');
const InternalServerError = require('../error/InternalServerError');
const { createUserRepo, getUserByNumber } = require('../repositories/user.repository');
const { bcryptPasswordGenerate, bcryptPasswordCheck } = require('../utils/bcrypt.util');
const {generateToken} = require('../utils/jwt.utils');


async function createOneUserService(data) {

    const { firstName, lastName,mobileNumber, password, role} = data;
    const hashedPassword = await bcryptPasswordGenerate(password);
  
    const user = await createUserRepo({
        firstName,
        lastName,
        mobileNumber, 
        password: hashedPassword,
        role
    });
   
    if (!user) {

        throw new InternalServerError("Internal Server Error", "Something Went Wrong")
    }
    return user;

}

async function loginOneUserService(data) {

    const { mobileNumber, password } = data;

    const user = await getUserByNumber(mobileNumber);

    if (!user) throw new BadRequest("BadRequest", "No user is registered via this mobile number");
    //here we can directly call the generalError class it is ok but for the reusability and maintainability 
    //we call user not found and it will also make the code cleaner
    

    const isMatch = await bcryptPasswordCheck(password, user.password)
    if (!isMatch) throw new BadRequest("Bad Request", "Invalid password");


    const token = generateToken({ id: user._id, role: user.role });


    return token;

}



module.exports = {
    createOneUserService,
    loginOneUserService
};