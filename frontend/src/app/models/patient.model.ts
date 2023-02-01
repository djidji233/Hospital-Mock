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

export class PatientCreationModificationRequest {
    identifier: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    gender: string | undefined;
    birthDate: Date | undefined;
    address: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    maritalStatus: string | undefined;
    organizationId: number | undefined;
    primaryCareProviderId: number | undefined;
}