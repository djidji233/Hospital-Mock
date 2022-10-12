import { GenderEnum } from "./gender.enum";
import { Organization } from "./organization.model";

export interface Practitioner {
    practitionerId: number,
    identifier: string,
    active: boolean,
    name: string,
    surname: string,
    gender: GenderEnum,
    birthDate: Date,
    address: string,
    phone: string,
    email: string,
    qualification: PractitionerQualificationEnum,
    organization: Organization
}

export enum PractitionerQualificationEnum {
    DOCTOR_OF_MEDICINE,
    MEDICAL_ASSISTANT,
    NURSE_PRACTITIONER,
    DOCTOR_OF_PHARMACY,
    CERTIFIED_NURSE_MIDWIFE,
    EMERGENCY_MEDICAL_TECHNICIAN
}

