package djordje.zivanovic.backend.bootstrap;

import djordje.zivanovic.backend.model.db.GenderEnum;
import djordje.zivanovic.backend.model.db.MaritalStatusEnum;
import djordje.zivanovic.backend.model.db.examination.*;
import djordje.zivanovic.backend.model.db.organization.Organization;
import djordje.zivanovic.backend.model.db.organization.OrganizationType;
import djordje.zivanovic.backend.model.db.organization.OrganizationTypeEnum;
import djordje.zivanovic.backend.model.db.patient.Patient;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import djordje.zivanovic.backend.model.db.practitioner.PractitionerQualificationEnum;
import djordje.zivanovic.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;

@Component
public class BootstrapData implements CommandLineRunner {

    private final ExaminationRepository examinationRepository;
    private final OrganizationRepository organizationRepository;
    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final OrganizationTypeRepository organizationTypeRepository;
    private final ServiceTypeRepository serviceTypeRepository;

    @Autowired
    public BootstrapData(ExaminationRepository examinationRepository,
                         OrganizationRepository organizationRepository,
                         PatientRepository patientRepository,
                         PractitionerRepository practitionerRepository,
                         OrganizationTypeRepository organizationTypeRepository,
                         ServiceTypeRepository serviceTypeRepository) {
        this.examinationRepository = examinationRepository;
        this.organizationRepository = organizationRepository;
        this.patientRepository = patientRepository;
        this.practitionerRepository = practitionerRepository;
        this.organizationTypeRepository = organizationTypeRepository;
        this.serviceTypeRepository = serviceTypeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Loading data...");

        // patient
        Patient patient = new Patient();
        patient.setPatientId(1L);
        patient.setIdentifier("PATT1");
        patient.setActive(true);
        patient.setName("Patient");
        patient.setSurname("Patientovski");
        patient.setGender(GenderEnum.UNKNOWN);
        patient.setBirthDate(Date.valueOf("2000-10-1"));
        patient.setAddress("Address 1");
        patient.setPhone("123123123");
        patient.setEmail("patient1@mail.com");
        patient.setDeceased(false);
        patient.setMaritalStatus(MaritalStatusEnum.NEVER_MARRIED);

        // practitioner
        Practitioner practitioner = new Practitioner();
        practitioner.setPractitionerId(1L);
        practitioner.setIdentifier("PRAC1");
        practitioner.setActive(true);
        practitioner.setName("Practitioner");
        practitioner.setSurname("Practitionashvili");
        practitioner.setGender(GenderEnum.MALE);
        practitioner.setBirthDate(Date.valueOf("1976-6-7"));
        practitioner.setAddress("Address 1");
        practitioner.setPhone("123123123");
        practitioner.setEmail("practitioner1@mail.com");
        practitioner.setQualification(PractitionerQualificationEnum.DOCTOR_OF_MEDICINE);

        // examination
        Examination examination = new Examination();
        examination.setExaminationId(1L);
        examination.setIdentifier("EXAM1");
        examination.setStatus(ExaminationStatusEnum.PLANNED);

        ServiceType serviceType = new ServiceType();
        serviceType.setServiceTypeId(1L);
        serviceType.setServiceType(ServiceTypeEnum.CARDIOLOGY);
        serviceTypeRepository.save(serviceType);
        serviceTypeRepository.save(new ServiceType(2L, ServiceTypeEnum.GENERAL));
        serviceTypeRepository.save(new ServiceType(3L, ServiceTypeEnum.INTENSIVE_CARE));
        serviceTypeRepository.save(new ServiceType(4L, ServiceTypeEnum.ENDOCRINOLOGY));
        serviceTypeRepository.save(new ServiceType(5L, ServiceTypeEnum.GYNECOLOGY));
        serviceTypeRepository.save(new ServiceType(6L, ServiceTypeEnum.GASTROENTEROLOGY));
        serviceTypeRepository.save(new ServiceType(7L, ServiceTypeEnum.HEMATOLOGY));
        serviceTypeRepository.save(new ServiceType(8L, ServiceTypeEnum.NEUROLOGY));
        serviceTypeRepository.save(new ServiceType(9L, ServiceTypeEnum.ONCOLOGY));
        serviceTypeRepository.save(new ServiceType(10L, ServiceTypeEnum.PEDIATRICS));
        serviceTypeRepository.save(new ServiceType(11L, ServiceTypeEnum.PULMONOLOGY));
        serviceTypeRepository.save(new ServiceType(12L, ServiceTypeEnum.RADIOLOGY));
        serviceTypeRepository.save(new ServiceType(13L, ServiceTypeEnum.OPHTHALMOLOGY));
        serviceTypeRepository.save(new ServiceType(142L, ServiceTypeEnum.OTOLARYNGOLOGY));
        serviceTypeRepository.save(new ServiceType(15L, ServiceTypeEnum.SURGERY));

        examination.setServiceType(serviceType);
        examination.setPriority(ExaminationPriorityEnum.ROUTINE);
        examination.setStartDate(new Date(System.currentTimeMillis()));
        examination.setEndDate(new Date(System.currentTimeMillis()+1000*60*15));
        examination.setDiagnosis("Everything was ok on this routine check.");

        // organization
        Organization organization = new Organization();
        organization.setOrganizationId(1L);
        organization.setIdentifier("ORGN1");
        organization.setActive(true);

        OrganizationType organizationType = new OrganizationType();
        organizationType.setOrganizationTypeId(1L);
        organizationType.setOrganizationType(OrganizationTypeEnum.HOSPITAL);
        organizationTypeRepository.save(organizationType);
        organizationTypeRepository.save(new OrganizationType(2L,OrganizationTypeEnum.INSURANCE_COMPANY));
        organizationTypeRepository.save(new OrganizationType(3L, OrganizationTypeEnum.EDUCATIONAL_INSTITUTE));
        organizationTypeRepository.save(new OrganizationType(4L, OrganizationTypeEnum.CLINICAL_RESEARCH));
        organizationTypeRepository.save(new OrganizationType(5L, OrganizationTypeEnum.OTHER));

        organization.setType(organizationType);
        organization.setName("Organization 1");
        organization.setAddress("Address 1");
        organization.setPhone("123123123");
        organization.setEmail("organization1@mail.com");

        // saving to db
        organizationRepository.save(organization);

        practitioner.setOrganization(organization);
        practitionerRepository.save(practitioner);

        patient.setOrganization(organization);
        patient.setPrimaryCareProvider(practitioner);
        patientRepository.save(patient);
        organization.setPatients(List.of(patient));
        organizationRepository.save(organization);

        examination.setOrganization(organization);
        examination.setPractitioners(List.of(practitioner));
        examination.setPatient(patient);
        examinationRepository.save(examination);
        organization.setExaminations(List.of(examination));
        organizationRepository.save(organization);

        practitioner.setExaminations(List.of(examination));
        practitioner.setPatients(List.of(patient));
        practitionerRepository.save(practitioner);
        organization.setPractitioners(List.of(practitioner));
        organizationRepository.save(organization);

        System.out.println("Data loaded!");

    }
}
