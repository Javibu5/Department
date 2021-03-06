import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DepartmentDto } from "../dto/department.dto";
import { RenameDepartmentDto } from "../dto/rename-department.dto";
import { DepartmentView } from "../read-model/schema/department.schema";
import { DepartmentService } from "../service/department.service";

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService){}

    
    @ApiOperation({ summary: 'Get Departments' })
    @ApiResponse ({ status: 200, description: 'Get Departments.' })
    @Header('x-total-count', '2')
    @Get()
    async getDepartments( ) : Promise<DepartmentView[]>{
        return await this.departmentService.getDepartments();
    }

    @ApiOperation({ summary: 'Create Department'})
    @ApiResponse ({ status: 200, description: 'Create Department.'})
    @HttpCode(200)
    @Post()
    async createDepartment(@Body() departmentDto : DepartmentDto ) : Promise<DepartmentDto> {
        await this.departmentService.createDepartment(departmentDto._id, departmentDto.name);

        const view = {
            _id: departmentDto._id,
            name: departmentDto.name
        }

        return view;
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
    async deleteDepartment(@Param() params) : Promise<void>{

        await this.departmentService.deleteDepartment(params.id);

    }

    @ApiOperation ({summary: 'Rename department'})
    @ApiResponse({ status: 204, description: 'Rename department'})
    @ApiResponse({ status: 404, description: 'Not found'})
    @Put(':id')
    async renameDepartment(@Query('id')id: string,@Body() departmentDto: RenameDepartmentDto){
        await this.departmentService.renameDepartment(id, departmentDto.name);
    }

}