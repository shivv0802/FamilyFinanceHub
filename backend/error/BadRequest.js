const GeneralError = require('./GeneralError');

class BadRequest extends GeneralError {
    constructor(detail) {
        super("BadRequest", 400, detail);
    }
}


module.exports = BadRequest;