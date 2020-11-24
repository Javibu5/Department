import { APP_GUARD } from "@nestjs/core";
import { Connection} from "mongoose";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DATABASE_CONNECTION } from "src/common/database";

import { DEPARTMENTS } from "../domain/repository";
import { DepartmentsEventStore } from "./event-store/departments.event-store";
import { DEPARTMENT_MODEL,DepartmentSchema } from "./read-model/schema/department.schema";

export const DepartmentProviders = [
    {
        provide: DEPARTMENTS,
        useClass: DepartmentsEventStore,
    },
    {
        provide: DEPARTMENT_MODEL,
        useFactory: (connection : Connection) => connection.model('Department', DepartmentSchema),
        inject: [DATABASE_CONNECTION],

    },
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },


]