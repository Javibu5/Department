
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DepartmentDto{
    @IsString()
    @ApiProperty()
    readonly _id! : string;
    @IsString()
    @ApiProperty()
    readonly name! : string;
}