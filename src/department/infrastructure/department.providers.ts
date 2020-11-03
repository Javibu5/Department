import { Connection } from "mongoose";
import { DATABASE_CONNECTION } from "src/common/database";
import { DepartmentSchema, DEPARTMENT_MODEL } from "./schema/department.schema";

export const DepartmentProviders = [
    {
        provide: DEPARTMENT_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Department', DepartmentSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: DEPARTMENT,
        useClass: DepartmentEventStore,
    },
    {
        provide: CHECK_UNIQUE_SCOPE_ALIAS,
        useClass: CheckUniqueScopeAliasFromReadModel,
    },
];