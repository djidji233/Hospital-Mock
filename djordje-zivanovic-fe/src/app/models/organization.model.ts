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
    HOSPITAL = "Hospital",
    INSURANCE_COMPANY = "Insurance company",
    EDUCATIONAL_INSTITUTE = "Educational institute",
    CLINICAL_RESEARCH = "Clinical research",
    OTHER = "Other"
}

export class OrganizationCreationModificationRequest {
    identifier: string;
    type: string;
    name: string;
    address: string;
    phone: string;
    email: string;

    constructor() {
        this.identifier = ''
        this.type = ''
        this.name = ''
        this.address = ''
        this.phone = ''
        this.email = ''
    }

}