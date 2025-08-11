class GeneralError extends Error {
  constructor(message, statusCode, detail) {
    super(message);
    this.statusCode = statusCode;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }

   getStatusCode(){
      return this.statusCode;
   }

   getJsonResponse(){
    return{
      code:this.statusCode,
      message : this.message,
      error :this.detail
    }
   }
}

module.exports = GeneralError;
