import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DepartmentDto } from "../dto/department.dto";
import { DepartmentService } from "../service/department.service";


@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService){}


    @ApiOperation({ summary: 'Get Departments' })
    @ApiResponse ({ status: 200, description: 'Get Departments.' })
    @Get()
    async getDepartments() : Promise<[]>{
        return []
    }

    @ApiOperation({ summary: 'Create Department'})
    @ApiResponse ({ status: 204, description: 'Create Department.'})
    @HttpCode(204)
    @Post()
    async createDepartment(@Body() departmentDto : DepartmentDto ) : Promise<void> {
        await this.departmentService.createDepartment(departmentDto.id, departmentDto.name);

    }

}