import { UserSigUpDto } from "./user.dto";

export abstract class UserAbstractRepository {
    abstract signUp(dto: UserSigUpDto, hashedPassword: string): Promise<any>
    abstract findByEmail(email:string):Promise<any>
}