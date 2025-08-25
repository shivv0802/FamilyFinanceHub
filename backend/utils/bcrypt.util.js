const bcrypt = require('bcrypt');
const BadRequest = require('../error/BadRequest');


async function bcryptPasswordCheck(inputPassword, hashedPassword) {

    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    if (!isMatch) throw new BadRequest("Invalid Password");
    return true;
}






async function bcryptPasswordGenerate(pwd) {

    const pass = await bcrypt.hash(pwd, 10);
    return pass;

}


module.exports = {
    bcryptPasswordGenerate,
    bcryptPasswordCheck
};