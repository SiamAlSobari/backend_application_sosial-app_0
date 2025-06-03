import { Request } from "express"

export class UserRequest extends Request{
    user:{
        id:string
        email:string
        password:string
    }
}