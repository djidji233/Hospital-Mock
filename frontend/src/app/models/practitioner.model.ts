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
    organization: any;
}

export enum PractitionerQualificationEnum {
    DOCTOR_OF_MEDICINE = "Doctor of medicine",
    MEDICAL_ASSISTANT = "Medical assistant",
    NURSE_PRACTITIONER = "Nurse practitioner",
    DOCTOR_OF_PHARMACY = "Doctor of pharmacy",
    CERTIFIED_NURSE_MIDWIFE = "Certified nurse midwife",
    EMERGENCY_MEDICAL_TECHNICIAN = "Emergency medical technician"
}

export class PractitionerCreationModificationRequest {
    identifier: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    gender: string | undefined;
    birthDate: Date | undefined;
    address: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    qualification: string | undefined;
    organizationId: number | undefined;
}

