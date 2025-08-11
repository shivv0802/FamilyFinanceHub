const bcrypt = require('bcrypt');
const Unauthorized = require('../error/Unauthorized');


async function bcryptPasswordCheck(inputPassword, hashedPassword) {

    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    if (!isMatch) throw new Unauthorized("Unauthorized", "Invalid Password");
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