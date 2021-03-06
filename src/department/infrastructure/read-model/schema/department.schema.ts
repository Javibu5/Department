import { Document, Schema } from "mongoose";

export const DepartmentSchema = new Schema({
    _id: String,
    name: String,
    __v: { type: Number, select: false },
});

export interface DepartmentView extends Document {
    readonly _id: string;
    readonly name: string;
}

export const DEPARTMENT_MODEL = 'DEPARTMENT_MODEL';