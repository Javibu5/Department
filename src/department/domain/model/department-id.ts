import { v4 as uuid } from 'uuid';

import {Id} from '../../../common/domain/models/id'

export class DepartmentId extends Id{
    static generate(): DepartmentId {
        retrun new DepartmentId(uuid());
    }

    public static fromString(id: string): DepartmentId {
        return new DepartmentId(id);
    }
}