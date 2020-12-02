import { DepartmentIdAlreadyRegisteredError } from "src/department/domain/exception/department-id-already-registered.error";
import { v4 as uuid } from 'uuid';

import { DepartmentId , DepartmentName, Department } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";
import { CreateDepartmentCommand } from "./create-department.command";
import { CreateDepartmentHandler } from "./create-department.handler";
import {Test, TestingModule} from '@nestjs/testing';


describe('CreateDepartmentHandler', () => {

    let command$: CreateDepartmentHandler;

    const departments: Partial<Departments> = {};

    const departmentId = DepartmentId.fromString(uuid());
    const name = DepartmentName.fromString('Department Name');

    beforeEach(async ()=> {
        cosnt module : TestingModule = await Test.createTestingModule({
            providers: [
                CreateDepartmentHandler,
                {
                    provide: DEPARTMENTS,
                    useValue: departments,
                }
            ]
        }).compile();


        command$ = module.get<CreateDepartmentHandler>(CreateDepartmentHandler);
        departments.find = jest.fn().mockResolvedValue(null);
        departments.save = jest.fn();        
    });


    


    it('should create a new department', async () =>{
        await command$.execute(
            new CreateDepartmentCommand(departmentId.value, name.value),
        );

        expect(departments.save).toHaveBeenCalledWith(Department.add (departmentId, name));
    });

    it('should not create an existing department id', async()=>{
        departments.find = jest.fn().mockResolvedValue(Department.add(departmentId, name));

        expect(command$.execute(
            new CreateDepartmentCommand(departmentId.value, name.value),
        ),
        ).rejects.toThrow(DepartmentIdAlreadyRegisteredError);

        expect(departments.save).toHaveBeenCalledTimes(0);
    });
});