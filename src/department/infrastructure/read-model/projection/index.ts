import { DepartmentWasCreatedProjection } from "./department-was-created.projection"
import { DepartmentWasDeletedProjection } from "./department-was-deleted.projection";
import { DepartmentWasRenamedProjection } from "./department-was-renamed.projection"

export const ProjectionHandlers = [
    DepartmentWasCreatedProjection,
    DepartmentWasDeletedProjection,
    DepartmentWasRenamedProjection,
];