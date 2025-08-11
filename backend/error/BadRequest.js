const GeneralError = require('./GeneralError');

class BadRequest extends GeneralError {
    constructor(message, detail) {
        super(message, 400, detail);
    }
}


module.exports = BadRequest;