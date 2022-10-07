package djordje.zivanovic.backend.service.patient;

import djordje.zivanovic.backend.exception.ApiException;
import djordje.zivanovic.backend.model.api.request.patient.PatientCreationRequest;
import djordje.zivanovic.backend.model.api.request.patient.PatientModificationRequest;
import djordje.zivanovic.backend.model.db.GenderEnum;
import djordje.zivanovic.backend.model.db.MaritalStatusEnum;
import djordje.zivanovic.backend.model.db.patient.Patient;
import djordje.zivanovic.backend.model.db.practitioner.PractitionerQualificationEnum;
import djordje.zivanovic.backend.repository.PatientRepository;
import djordje.zivanovic.backend.service.organization.OrganizationService;
import djordje.zivanovic.backend.service.practitioner.PractitionerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private PractitionerService practitionerService;

    @Override
    public List<Patient> findAll() {
        return patientRepository
                .findAll()
                .stream()
                .filter(Patient::getActive)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Patient> findById(Long patientId) {
        return patientRepository
                .findById(patientId)
                .filter(Patient::getActive);
    }

    @Override
    public Patient create(PatientCreationRequest request) {
        Patient patient = new Patient();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            patientRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            patient1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "create patient");
                            },
                            () -> {
                                patient.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        patient.setActive(true);
        patient.setName(request.getName());
        patient.setSurname(request.getSurname());
        if (request.getGender() != null) {
            if (Arrays.stream(GenderEnum.values()).anyMatch(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))) {
                patient.setGender(
                        Arrays.stream(GenderEnum.values())
                                .filter(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that gender doesn't exist", "create patient");
            }
        }
        patient.setBirthDate(request.getBirthDate());
        if (request.getAddress() != null && !request.getAddress().isBlank()) {
            patient.setAddress(request.getAddress());
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            patient.setPhone(request.getPhone());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            patient.setEmail(request.getEmail());
        }
        patient.setDeceased(false);
        if (request.getMaritalStatus() != null) {
            if (Arrays.stream(MaritalStatusEnum.values()).anyMatch(maritalStatusEnum -> maritalStatusEnum.name().equalsIgnoreCase(request.getMaritalStatus()))) {
                patient.setMaritalStatus(
                        Arrays.stream(MaritalStatusEnum.values())
                                .filter(maritalStatusEnum -> maritalStatusEnum.name().equalsIgnoreCase(request.getMaritalStatus()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that marital status doesn't exist", "create patient");
            }
        }
        if (request.getOrganizationId() != null) {
            organizationService.findById(request.getOrganizationId())
                    .ifPresentOrElse(
                            patient::setOrganization,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "create patient");
                            }
                    );
        }
        if (request.getPrimaryCareProviderId() != null) {
            practitionerService.findById(request.getPrimaryCareProviderId())
                    .ifPresentOrElse(
                            practitioner -> {
                                if (practitioner.getQualification() == PractitionerQualificationEnum.DOCTOR_OF_MEDICINE) {
                                    patient.setPrimaryCareProvider(practitioner);
                                } else {
                                    throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner isn't Doctor of Medicine", "create patient");
                                }
                            },
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner doesn't exist", "create patient");
                            }
                    );
        }
        return patientRepository.save(patient);
    }

    @Override
    public Patient update(Long patientId, PatientModificationRequest request) {
        Optional<Patient> patientOpt = findById(patientId);
        patientOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "patient with that id doesn't exist", "update patient");
        });
        Patient patient = patientOpt.get();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            patientRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            patient1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "update patient");
                            },
                            () -> {
                                patient.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        if (request.getName() != null) {
            patient.setName(request.getName());
        }
        if (request.getSurname() != null) {
            patient.setSurname(request.getSurname());
        }
        if (request.getGender() != null) {
            if (Arrays.stream(GenderEnum.values()).anyMatch(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))) {
                patient.setGender(
                        Arrays.stream(GenderEnum.values())
                                .filter(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that gender doesn't exist", "update patient");
            }
        }
        if (request.getBirthDate() != null) {
            patient.setBirthDate(request.getBirthDate());
        }
        if (request.getAddress() != null) {
            patient.setAddress(request.getAddress());
        }
        if (request.getPhone() != null) {
            patient.setPhone(request.getPhone());
        }
        if (request.getEmail() != null) {
            patient.setEmail(request.getEmail());
        }
        if (request.getDeceased() != null) {
            patient.setDeceased(request.getDeceased());
        }
        if (request.getMaritalStatus() != null) {
            if (Arrays.stream(MaritalStatusEnum.values()).anyMatch(maritalStatusEnum -> maritalStatusEnum.name().equalsIgnoreCase(request.getMaritalStatus()))) {
                patient.setMaritalStatus(
                        Arrays.stream(MaritalStatusEnum.values())
                                .filter(maritalStatusEnum -> maritalStatusEnum.name().equalsIgnoreCase(request.getMaritalStatus()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that marital status doesn't exist", "update patient");
            }
        }
        if (request.getOrganizationId() != null) {
            organizationService.findById(request.getOrganizationId())
                    .ifPresentOrElse(
                            patient::setOrganization,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "update patient");
                            }
                    );
        }
        if (request.getPrimaryCareProviderId() != null) {
            practitionerService.findById(request.getPrimaryCareProviderId())
                    .ifPresentOrElse(
                            practitioner -> {
                                if (practitioner.getQualification() == PractitionerQualificationEnum.DOCTOR_OF_MEDICINE) {
                                    patient.setPrimaryCareProvider(practitioner);
                                } else {
                                    throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner isn't Doctor of Medicine", "update patient");
                                }
                            },
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner doesn't exist", "update patient");
                            }
                    );
        }
        return patientRepository.save(patient);
    }

    @Override
    public Void delete(Long patientId) {
        Optional<Patient> patientOpt = findById(patientId);
        patientOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "patient with that id doesn't exist", "delete patient");
        });
        Patient patient = patientOpt.get();
        patient.setActive(false);
        patientRepository.save(patient);
        return null;
    }
}
