
export const internalErrorResponse = (error) => { 
    return {
        success: false,
        err: error,
        message:"Internal Server Error",
        data: {},
    };
  }

export const customErrorResponse = (error) => {
    
    if(!error.message&& !error.explanation){
        return internalErrorResponse(error);
    }
    
    return {
        success: false,
        err: error.explanation || error.message,
        message:error.message,
        data: {},
    };
}

export const successResponse = (data, message) => {
    return {
        success: true,
        message,
        data,
        err:{}
    };
}