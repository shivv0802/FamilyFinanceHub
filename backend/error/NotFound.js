const GeneralError = require('../error/GeneralError');

class NotFound extends GeneralError {
    constructor(message, detail){
        super(message,404,detail)
    }
}


module.exports = NotFound;