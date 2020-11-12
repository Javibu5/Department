import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { DepartmentDto } from "../dto/department.dto";
import { RenameDepartmentDto } from "../dto/rename-department.dto";
import { DepartmentView } from "../read-model/schema/department.schema";
import { DepartmentService } from "../service/department.service";


@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService){}


    @ApiOperation({ summary: 'Get Departments' })
    @ApiResponse ({ status: 200, description: 'Get Departments.' })
    @Get()
    async getDepartments() : Promise<DepartmentView[]>{
        return await this.departmentService.getDepartments();
    }

    @ApiOperation({ summary: 'Create Department'})
    @ApiResponse ({ status: 204, description: 'Create Department.'})
    @HttpCode(204)
    @Post()
    async createDepartment(@Body() departmentDto : DepartmentDto ) : Promise<void> {
        await this.departmentService.createDepartment(departmentDto.id, departmentDto.name);

    }

    @ApiOperation ({summary: 'Get department'})
    @ApiResponse({ status: 200, description: 'Get department.' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @Get(':id')
    async getDepartment(@Query('id') id : string) : Promise<DepartmentView>{
        
       try{
        return await this.departmentService.getDepartment(id);
       }catch (e) {
        if (e instanceof Error) {
            throw new BadRequestException(`Unexpected error: ${e.message}`);
          } else {
            throw new BadRequestException('Server error');
          }
       }
    }

    @ApiOperation ({summary: 'Delete department'})
    @ApiResponse({ status: 204, description: 'Delete department'})
    @ApiResponse({ status: 404, description: 'Not found'})
    @Delete(':id')
    async deleteDepartment(@Query('id') id: string) : Promise<void>{

        await this.departmentService.deleteDepartment(id);

    }

    @ApiOperation ({summary: 'Rename department'})
    @ApiResponse({ status: 204, description: 'Rename department'})
    @ApiResponse({ status: 404, description: 'Not found'})
    @Put(':id')
    async renameDepartment(@Query('id')id: string,@Body() departmentDto: RenameDepartmentDto){
        await this.departmentService.renameDepartment(id, departmentDto.name);
    }

}