const GeneralError = require('./GeneralError')

class Unauthorized extends GeneralError {
    constructor(message, detail) {
        super(message, 401, detail);
    }
}

module.exports = Unauthorized;
