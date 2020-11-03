import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

expert class RenameDepartmentDto{
    @IsString()
    @ApiProperty()
    readonly name!: string;
}