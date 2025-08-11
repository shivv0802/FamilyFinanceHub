const GeneralError = require('../error/GeneralError')

class BaseController{
async sendErrorResponse(res,err){
    if(err instanceof GeneralError){
      
        return res.status(err.getStatusCode()).json(err.getJsonResponse())
    }
     
    return res.status(500).json({
        code:500,
        message : "Internal Server Error",
        error : err.message
    })

}

async sendJSONResponse(res,metadata,message,data){
    const response = {
        code : 200,
        metadata,
        message,
        data
    }

    res.status(200).json(response)
}

}

module.exports = BaseController