export interface Examination {
    examinationId: number,
    identifier: string,
    status: ExaminationStatusEnum,
    serviceType: any,
    priority: ExaminationPriorityEnum,
    startDate: string,
    endDate: string,
    diagnosis: string,
    organization: any,
    patient: any,
    practitioners: any[]
}

export enum ExaminationStatusEnum {
    PLANNED = 'Planned',
    TRIAGED = 'Triaged',
    IN_PROGRESS = 'In progress',
    SUSPENDED = 'Suspended',
    FINISHED = 'Finished',
    CANCELLED = 'Cancelled',
    ENTERED_IN_ERROR = 'Entered in error'
}

export interface ServiceType {
    serviceTypeId: number,
    serviceType: ServiceTypeEnum
}

export enum ServiceTypeEnum {
    GENERAL = 'General',
    CARDIOLOGY = 'Cardiology',
    INTENSIVE_CARE = 'Intensive care',
    ENDOCRINOLOGY = 'Endocrinology',
    GYNECOLOGY = 'Gynecology',
    GASTROENTEROLOGY = 'Gastoenterology',
    HEMATOLOGY = 'Hematology',
    NEUROLOGY = 'Neurology',
    ONCOLOGY = 'Oncology',
    PEDIATRICS = 'Pediatrics',
    PULMONOLOGY = 'Pulmonology',
    RADIOLOGY = 'Radiology',
    OPHTHALMOLOGY = 'Ophthalmology',
    OTOLARYNGOLOGY = 'Otolaryngology',
    SURGERY = 'Surgery'
}

export enum ExaminationPriorityEnum {
    ASAP = 'ASAP',
    CALLBACK_RESULTS = 'Callback results',
    EMERGENCY = 'Emergency',
    ROUTINE = 'Routine',
    RUSH_REPORTING = 'Rush reporting',
    TIMING_CRITICAL = 'Timing critical'
}

export class ExaminationCreationModificationRequest {
    identifier: string | undefined;
    status: string | undefined;
    serviceType: string | undefined;
    priority: string | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    diagnosis: any | undefined;
    organizationId: number | undefined;
    patientId: number | undefined;
    practitionerIds: number[] | undefined;
}