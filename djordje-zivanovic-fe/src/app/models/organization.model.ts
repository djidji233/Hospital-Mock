export interface Organization {
    organizationId: number,
    identifier: string,
    active: boolean,
    type: OrganizationType,
    name: string,
    address: string,
    phone: string,
    email: string,
}

export interface OrganizationType {
    organizationTypeId: number,
    organizationType: OrganizationTypeEnum
}

export enum OrganizationTypeEnum {
    HOSPITAL,
    INSURANCE_COMPANY,
    EDUCATIONAL_INSTITUTE,
    CLINICAL_RESEARCH,
    OTHER
}