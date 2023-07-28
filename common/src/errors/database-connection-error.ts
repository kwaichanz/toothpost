import { CustomError } from "./custom-error";


export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    constructor(){
        super('database connection error')
    }

    generateErrors(){
        return [{message: "database connection error"}]
    }
}