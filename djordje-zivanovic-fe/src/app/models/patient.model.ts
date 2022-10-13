import { GenderEnum } from "./gender.enum";
import { MaritalStatusEnum } from "./marital.status.enum";

export interface Patient {
    patientId: number,
    identifier: string,
    active: boolean,
    name: string,
    surname: string,
    gender: GenderEnum,
    birthDate: Date,
    address: string,
    phone: string,
    email: string,
    deceased: boolean,
    maritalStatus: MaritalStatusEnum,
    organization: any,
    primaryCareProvider: any
}