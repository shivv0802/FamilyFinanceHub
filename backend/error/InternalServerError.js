const GeneraError = require('../error/GeneralError');

class InternalServerError extends GeneraError {
    constructor(message , detail) {
        super(message, 500, detail);
    }
}

module.exports = InternalServerError;