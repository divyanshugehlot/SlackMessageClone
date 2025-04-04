import { StatusCodes } from "http-status-codes";

import { customErrorResponse } from "../utils/common/responseObjects.js";

export const validate = (schema) => {
return async (req,res,next)=>{
    try {
        const result = await schema.parseAsync(req.body);
        req.body=result;
        next();
    } catch (error) {
        console.log("valdation errro in zod validator",error)
        let explanation = [];
        let errorMessage = '';
       error.errors.forEach((key) => {
            explanation.push(key.path[0]+' '+key.message);
            errorMessage +=':'+key.path[0]+' '+ key.message + ', ';

        }
        );
        return res.status(StatusCodes.BAD_REQUEST).json(
            customErrorResponse({
                message:"Validation error"+errorMessage,
                explanation:explanation,

            })
        );
    }   
}
}