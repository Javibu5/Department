import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RenameDepartmentDto {
    @IsString()
    @ApiProperty()
    readonly name!: string;
}