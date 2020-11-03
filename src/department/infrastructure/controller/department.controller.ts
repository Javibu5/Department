import {
    BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentDto } from '../dto';
import { DepartmentView } from '../schema/department.schema';
import { DepartmentService } from '../service/department.service';


@ApiTags('Department')
@Controller('department')
export class DepartmentController{
    constructor(private readonly departmentService: DepartmentService){}

    @ApiOperation({ summary: 'Get Departments' })
    @ApiResponse ({ status: 200, description: 'Get Departments.' })
    @Get()
    async getDepartments() : Promise<DepartmentView[]>{
        return this.departmentService.getDepartments()
    }

    @ApiOperation({ summary: 'Create Department'})
    @ApiResponse ({ status: 204, description: 'Create Department.'})
    @HttpCode(204)
    @Post()
    async createDepartment (@Body() departmentDto: DepartmentDto): Promise<DepartmentDto> {
        try{
            return await this.departmentService.createDepartment(
                departmentDto.id,
                departmentDto.name,
                departmentDto.alias,
            );
        } catch (e) {
            if (e instanceof DepartmentIdAlreadyRegisteredError) {
                throw now ConflictException(e.message);
            } else if (e instanceof DepartmentAliasAlreadyRegisteredError) {
                throw new ConflictException(e.message);
            }else if(e instanceof Error){
                throw new BadRequestException('Unexpected error: ${e.message}');
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    @ApiOperation({ summary: 'Get Department' })
    @ApiResponse({ status: 204, description: 'Get Department'})
    @ApiResponse({ status: 404, description: 'Not found'})
    @Get(':id')
    async getDepartment(@Query('id') id: string): Promise<DepartmentView> {
        try {
            return await this.departmentService.getDepartment(id);
        } catch (e) {
            if(e instanceof DepartmentNotFoundError){
                throw new NotFoundException('Department not found');
            } else if (e instaceof Error){
                throw new BadRequestException('Unexpeted error: ${e.message}');
            } else {
                throw new BadRequestException('Server error');
            }
        }
    }

    async renameDepartment(@Query('id') id: string, @Body() DepartmentDto: RenameDepartmentDto){
        try{
            return await this.departmentService.renameDepartment(id, DepartmentDto.name);
        } catch (e) {
            if (e instanceof DepartmentIdNotFoundError) {
                throw new NotFoundException('Department not found');
              } else if (e instanceof Error) {
                throw new BadRequestException(`Unexpected error: ${e.message}`);
              } else {
                throw new BadRequestException('Server error');
              }
            }
          }
        
    
    @ApiOperation({ summary: 'Delete Department'})
    @ApiResponse({ status: 204, description: 'Delete department'})
    @ApiResponse({status: 404, description: 'Not found'})
    @HttpCode(204)
    @Delete(':id')
    async removeDepartment(@Query('id') id:string) {
        try{
            return await this.departmentService.removeDepartment(id);
        } catch (e) {
            if (e instanceof DepartmentIdNotFoundError) {
              throw new NotFoundException('Department not found');
            } else if (e instanceof Error) {
              throw new BadRequestException(`Unexpected error: ${e.message}`);
            } else {
              throw new BadRequestException('Server error');
            }
        }
    }
}   

