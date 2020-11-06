import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DepartmentDto } from "../dto/department.dto";
import { DepartmentView } from "../read-model/schema/department.schema";
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

    @ApiOperation ({summary: 'Get department'})
    @ApiResponse({ status: 204, description: 'Get department.' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @Get(':id')
    async getDepartment() : Promise<DepartmentView>{
        return await this.departmentService.
    }

}