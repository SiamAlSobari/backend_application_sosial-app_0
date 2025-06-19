import { IsOptional } from "class-validator";

export class QueryFollowerDto{
    @IsOptional()
    page:number = 1;

    @IsOptional()
    limit:number = 10;

    @IsOptional()
    search:string = "";
}