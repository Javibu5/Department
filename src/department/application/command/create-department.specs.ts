import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuid } from 'uuid';

import { DepartmentAliasAlreadyRegisteredError } from "src/department/domain/exception/department-alias-already-registered.error";
import { DepartmentIdAlreadyRegisteredError } from "src/department/domain/exception/department-id-already-registered.error";

import { Department, DepartmentAlias, DepartmentId, DepartmentName } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";
import { CheckUniqueDepartmentAlias, CHECK_UNIQUE_DEPARTMENT_ALIAS } from "src/department/domain/services/check-unique-department-alias.service";

import { CreateDepartmentHandler } from "./create-department-handler";
import { CreateDepartmentCommand } from "./create-deppartment.command";

describe('CreateDepartmentHandler', () => {
    let command$: CreateDepartmentHandler;
    const departments: Partial<Departments> = {};
    const checkUniqueDepartmentAlias: Partial<CheckUniqueDepartmentAlias> = {};

    const departmentId = DepartmentId.fromString(uuid());
    const name = DepartmentName.fromString('Department Name');
    const alias = DepartmentAlias.fromString('department-alias');

    beforeEach(async() =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDepartmentHandler,
                {
                    provider: DEPARTMENTS,
                    useValue: departments,
                },
                {
                    provide: CHECK_UNIQUE_DEPARTMENT_ALIAS,
                    useValue: checkUniqueDepartmentAlias,
                },
            ],
        }).compile();
        
        command$ = module.get<CreateDepartmentHandler>(CreateDepartmentHandler);
        departments.find = jest.fn().mockResolvedValue(null);
        departments.save = jest.fn();
        checkUniqueDepartmentAlias.with = jest.fn().mockResolvedValue(null);
    } );

    it('should creates a new department', async() => {
        checkUniqueDepartmentAlias.with = jest.fn().mockResolvedValue(departmentId);

           await command$.execute(
                new CreateDepartmentCommand(departmentId.value, name.value, alias.value),
            );

            expect(departments.save).toHaveBeenCalledWith(Department.add(departmentId, name, alias));       
    });

    it('should not creates an existing department alias', async() => {
        checkUniqueDepartmentAlias.with = jest.fn().mockResolvedValue(departmentId);

        expect(
            command$.execute(
                new CreateDepartmentCommand(departmentId.value, name.value, alias.value),
            ),
        ).rejects.toThrow(DepartmentAliasAlreadyRegisteredError);

            expect(departments.save).toHaveBeenCalledWith(0);       
    });

    it('should not creates an existing department id', async () => {
        departments.find = jest.fn().mockResolvedValue(Department.add(departmentId, name, alias));
    
        expect(
          command$.execute(
            new CreateDepartmentCommand(departmentId.value, name.value, alias.value),
          ),
        ).rejects.toThrow(DepartmentIdAlreadyRegisteredError);
    
        expect(departments.save).toHaveBeenCalledTimes(0);
      });
    });
