package djordje.zivanovic.backend.service.examination;

import djordje.zivanovic.backend.exception.ApiException;
import djordje.zivanovic.backend.model.api.request.examination.ExaminationCreationRequest;
import djordje.zivanovic.backend.model.api.request.examination.ExaminationModificationRequest;
import djordje.zivanovic.backend.model.db.examination.Examination;
import djordje.zivanovic.backend.model.db.examination.ExaminationPriorityEnum;
import djordje.zivanovic.backend.model.db.examination.ExaminationStatusEnum;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import djordje.zivanovic.backend.repository.ExaminationRepository;
import djordje.zivanovic.backend.repository.PractitionerRepository;
import djordje.zivanovic.backend.repository.ServiceTypeRepository;
import djordje.zivanovic.backend.service.organization.OrganizationService;
import djordje.zivanovic.backend.service.patient.PatientService;
import djordje.zivanovic.backend.service.practitioner.PractitionerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExaminationServiceImpl implements ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private PractitionerService practitionerService;
    @Autowired
    private PractitionerRepository practitionerRepository;

    @Override
    public List<Examination> findAll() {
        return examinationRepository
                .findAll()
                .stream()
                .filter(examination -> examination.getStatus() != ExaminationStatusEnum.ENTERED_IN_ERROR)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Examination> findById(Long examinationId) {
        return examinationRepository
                .findById(examinationId)
                .filter(examination -> examination.getStatus() != ExaminationStatusEnum.ENTERED_IN_ERROR);
    }

    @Override
    public Examination create(ExaminationCreationRequest request) {
        Examination examination = new Examination();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            examinationRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            organization1 -> {//TODO: edit to correct type everywhere
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "create examination");
                            },
                            () -> {
                                examination.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        if (Arrays.stream(ExaminationStatusEnum.values()).anyMatch(examinationStatusEnum -> examinationStatusEnum.name().equalsIgnoreCase(request.getStatus()))) {
            examination.setStatus(
                    Arrays.stream(ExaminationStatusEnum.values())
                            .filter(examinationStatusEnum -> examinationStatusEnum.name().equalsIgnoreCase(request.getStatus()))
                            .findFirst()
                            .get()
            );
        } else {
            throw new ApiException(HttpStatus.BAD_REQUEST, "that status doesn't exist", "create examination");
        }
        serviceTypeRepository
                .findByServiceType(request.getServiceType().toUpperCase())
                .ifPresentOrElse(
                        examination::setServiceType,
                        () -> {
                            throw new ApiException(HttpStatus.BAD_REQUEST, "that type doesn't exist", "create examination");
                        }
                );
        if (request.getPriority() != null && !request.getPriority().isBlank()) {
            if (Arrays.stream(ExaminationPriorityEnum.values()).anyMatch(examinationPriorityEnum -> examinationPriorityEnum.name().equalsIgnoreCase(request.getPriority()))) {
                examination.setPriority(
                        Arrays.stream(ExaminationPriorityEnum.values())
                                .filter(examinationPriorityEnum -> examinationPriorityEnum.name().equalsIgnoreCase(request.getPriority()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that priority doesn't exist", "create examination");
            }
        }
        if (request.getStartDate() != null) {
            examination.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            examination.setEndDate(request.getEndDate());
        }
        if (request.getDiagnosis() != null && !request.getDiagnosis().isBlank()) {
            examination.setDiagnosis(request.getDiagnosis());
        }
        organizationService
                .findById(request.getOrganizationId())
                .ifPresentOrElse(
                        examination::setOrganization,
                        () -> {
                            throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "create examination");
                        }
                );
        patientService
                .findById(request.getPatientId())
                .ifPresentOrElse(
                        examination::setPatient,
                        () -> {
                            throw new ApiException(HttpStatus.BAD_REQUEST, "that patient doesn't exist", "create examination");
                        }
                );

        List<Practitioner> practitioners = new ArrayList<>();
        request.getPractitionerIds()
                .forEach(practitionerId -> {
                            practitionerService
                                    .findById(practitionerId)
                                    .ifPresentOrElse(
                                            practitioners::add,
                                            () -> {
                                                throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner doesn't exist", "create examination");
                                            }
                                    );
                        }
                );
        examination.setPractitioners(practitioners);
        examinationRepository.save(examination);
        practitioners.forEach(
                practitioner -> {
                    List<Examination> examinations = practitioner.getExaminations();
                    examinations.add(examination);
                    practitioner.setExaminations(examinations);
                    practitionerRepository.save(practitioner);
                }
        );
        return examination;
    }

    @Override
    public Examination update(Long examinationId, ExaminationModificationRequest request) {
        Optional<Examination> examinationOpt = findById(examinationId);
        examinationOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "examination with that id doesn't exist", "update examination");
        });
        Examination examination = examinationOpt.get();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            examinationRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            organization1 -> {//TODO: edit to correct type everywhere
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "update examination");
                            },
                            () -> {
                                examination.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        if (request.getStatus() != null) {
            if (Arrays.stream(ExaminationStatusEnum.values()).anyMatch(examinationStatusEnum -> examinationStatusEnum.name().equalsIgnoreCase(request.getStatus()))) {
                examination.setStatus(
                        Arrays.stream(ExaminationStatusEnum.values())
                                .filter(examinationStatusEnum -> examinationStatusEnum.name().equalsIgnoreCase(request.getStatus()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that status doesn't exist", "update examination");
            }
        }
        if (request.getServiceType() != null) {
            serviceTypeRepository
                    .findByServiceType(request.getServiceType().toUpperCase())
                    .ifPresentOrElse(
                            examination::setServiceType,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that type doesn't exist", "update examination");
                            }
                    );
        }
        if (request.getPriority() != null) {
            if (Arrays.stream(ExaminationPriorityEnum.values()).anyMatch(examinationPriorityEnum -> examinationPriorityEnum.name().equalsIgnoreCase(request.getPriority()))) {
                examination.setPriority(
                        Arrays.stream(ExaminationPriorityEnum.values())
                                .filter(examinationPriorityEnum -> examinationPriorityEnum.name().equalsIgnoreCase(request.getPriority()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that priority doesn't exist", "update examination");
            }
        }
        if (request.getStartDate() != null) {
            examination.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            examination.setEndDate(request.getEndDate());
        }
        if (request.getDiagnosis() != null) {
            examination.setDiagnosis(request.getDiagnosis());
        }
        if (request.getOrganizationId() != null) {
            organizationService
                    .findById(request.getOrganizationId())
                    .ifPresentOrElse(
                            examination::setOrganization,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "update examination");
                            }
                    );
        }
        if (request.getPatientId() != null) {
            patientService
                    .findById(request.getPatientId())
                    .ifPresentOrElse(
                            examination::setPatient,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that patient doesn't exist", "update examination");
                            }
                    );
        }


        List<Practitioner> practitioners = new ArrayList<>();
        if (request.getPractitionerIds() != null && !request.getPractitionerIds().isEmpty()) {
            // unlink old practitioners from that examination
            examination.getPractitioners().forEach(
                    practitioner -> {
                        List<Examination> oldExaminations = practitioner.getExaminations();
                        oldExaminations.remove(examination);
                        practitioner.setExaminations(oldExaminations);
                        practitionerRepository.save(practitioner);
                    }
            );
            request.getPractitionerIds()
                    .forEach(practitionerId -> {
                                practitionerService
                                        .findById(practitionerId)
                                        .ifPresentOrElse(
                                                practitioners::add,
                                                () -> {
                                                    throw new ApiException(HttpStatus.BAD_REQUEST, "that practitioner doesn't exist", "update examination");
                                                }
                                        );
                            }
                    );
            examination.setPractitioners(practitioners);
        }
        examinationRepository.save(examination);
        practitioners.forEach(
                practitioner -> {
                    List<Examination> examinations = practitioner.getExaminations();
                    examinations.add(examination);
                    practitioner.setExaminations(examinations);
                    practitionerRepository.save(practitioner);
                }
        );
        return examination;
    }

    @Override
    public Void delete(Long examinationId) {
        Optional<Examination> examinationOpt = findById(examinationId);
        examinationOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "examination with that id doesn't exist", "delete examination");
        });
        Examination examination = examinationOpt.get();
        // unlink practitioners from that examination
        examination.getPractitioners().forEach(
                practitioner -> {
                    List<Examination> oldExaminations = practitioner.getExaminations();
                    oldExaminations.remove(examination);
                    practitioner.setExaminations(oldExaminations);
                    practitionerRepository.save(practitioner);
                }
        );
        examination.setStatus(ExaminationStatusEnum.ENTERED_IN_ERROR);
        examinationRepository.save(examination);
        return null;
    }
}
