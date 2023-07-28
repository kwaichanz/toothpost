import { CustomError } from "./custom-error"


export class UnauthorizedError extends CustomError {
    statusCode = 401;
    
    constructor(){
        super('unauthorized')
    }

    generateErrors(){
        return [{message: "unauthorized"}]
    }
}