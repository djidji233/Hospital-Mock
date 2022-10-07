package djordje.zivanovic.backend.service.practitioner;

import djordje.zivanovic.backend.exception.ApiException;
import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerCreationRequest;
import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerModificationRequest;
import djordje.zivanovic.backend.model.db.GenderEnum;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import djordje.zivanovic.backend.model.db.practitioner.PractitionerQualificationEnum;
import djordje.zivanovic.backend.repository.PractitionerRepository;
import djordje.zivanovic.backend.service.organization.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PractitionerServiceImpl implements PractitionerService {

    @Autowired
    private PractitionerRepository practitionerRepository;
    @Autowired
    private OrganizationService organizationService;

    @Override
    public List<Practitioner> findAll(Long organizationId) {
        return practitionerRepository
                .findAll()
                .stream()
                .filter(Practitioner::getActive)
                .filter(practitioner -> {
                    if (organizationId != null) {
                        return practitioner.getOrganization().getOrganizationId().equals(organizationId);
                    } else {
                        return true;
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Practitioner> findById(Long practitionerId) {
        return practitionerRepository
                .findById(practitionerId)
                .filter(Practitioner::getActive);
    }

    @Override
    public Practitioner create(PractitionerCreationRequest request) {
        Practitioner practitioner = new Practitioner();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            practitionerRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            practitioner1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "create practitioner");
                            },
                            () -> {
                                practitioner.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        practitioner.setActive(true);
        practitioner.setName(request.getName());
        practitioner.setSurname(request.getSurname());
        if (request.getGender() != null) {
            if (Arrays.stream(GenderEnum.values()).anyMatch(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))) {
                practitioner.setGender(
                        Arrays.stream(GenderEnum.values())
                                .filter(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that gender doesn't exist", "create practitioner");
            }
        }
        practitioner.setBirthDate(request.getBirthDate());
        if (request.getAddress() != null && !request.getAddress().isBlank()) {
            practitioner.setAddress(request.getAddress());
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            practitioner.setPhone(request.getPhone());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            practitioner.setEmail(request.getEmail());
        }
        if (Arrays.stream(PractitionerQualificationEnum.values()).anyMatch(practitionerQualificationEnum -> practitionerQualificationEnum.name().equalsIgnoreCase(request.getQualification()))) {
            practitioner.setQualification(
                    Arrays.stream(PractitionerQualificationEnum.values())
                            .filter(practitionerQualificationEnum -> practitionerQualificationEnum.name().equalsIgnoreCase(request.getQualification()))
                            .findFirst()
                            .get()
            );
        } else {
            throw new ApiException(HttpStatus.BAD_REQUEST, "that qualification doesn't exist", "create practitioner");
        }
        if (request.getOrganizationId() != null) {
            organizationService.findById(request.getOrganizationId())
                    .ifPresentOrElse(
                            practitioner::setOrganization,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "create practitioner");
                            }
                    );
        }
        practitioner.setExaminations(new ArrayList<>());
        return practitionerRepository.save(practitioner);
    }

    @Override
    public Practitioner update(Long practitionerId, PractitionerModificationRequest request) {
        Optional<Practitioner> practitionerOpt = findById(practitionerId);
        practitionerOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "practitioner with that id doesn't exist", "update practitioner");
        });
        Practitioner practitioner = practitionerOpt.get();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            practitionerRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            practitioner1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "update practitioner");
                            },
                            () -> {
                                practitioner.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        if (request.getName() != null) {
            practitioner.setName(request.getName());
        }
        if (request.getSurname() != null) {
            practitioner.setSurname(request.getSurname());
        }
        if (request.getGender() != null) {
            if (Arrays.stream(GenderEnum.values()).anyMatch(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))) {
                practitioner.setGender(
                        Arrays.stream(GenderEnum.values())
                                .filter(genderEnum -> genderEnum.name().equalsIgnoreCase(request.getGender()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that gender doesn't exist", "update practitioner");
            }
        }
        if (request.getBirthDate() != null) {
            practitioner.setBirthDate(request.getBirthDate());
        }
        if (request.getAddress() != null) {
            practitioner.setAddress(request.getAddress());
        }
        if (request.getPhone() != null) {
            practitioner.setPhone(request.getPhone());
        }
        if (request.getEmail() != null) {
            practitioner.setEmail(request.getEmail());
        }
        if (request.getQualification() != null) {
            if (Arrays.stream(PractitionerQualificationEnum.values()).anyMatch(practitionerQualificationEnum -> practitionerQualificationEnum.name().equalsIgnoreCase(request.getQualification()))) {
                practitioner.setQualification(
                        Arrays.stream(PractitionerQualificationEnum.values())
                                .filter(practitionerQualificationEnum -> practitionerQualificationEnum.name().equalsIgnoreCase(request.getQualification()))
                                .findFirst()
                                .get()
                );
            } else {
                throw new ApiException(HttpStatus.BAD_REQUEST, "that qualification doesn't exist", "update practitioner");
            }
        }
        if (request.getOrganizationId() != null) {
            organizationService.findById(request.getOrganizationId())
                    .ifPresentOrElse(
                            practitioner::setOrganization,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that organization doesn't exist", "update practitioner");
                            }
                    );
        }
        return practitionerRepository.save(practitioner);
    }

    @Override
    public Void delete(Long practitionerId) {
        Optional<Practitioner> practitionerOpt = findById(practitionerId);
        practitionerOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "practitioner with that id doesn't exist", "delete practitioner");
        });
        Practitioner practitioner = practitionerOpt.get();
        practitioner.setActive(false);
        practitionerRepository.save(practitioner);
        return null;
    }

//    @Override
//    public List<Practitioner> findAllByOrganizationId(Long organizationId) {
//        return findAll()
//                .stream()
//                .filter(practitioner -> {
//                    if (practitioner.getOrganization() != null) {
//                        return practitioner.getOrganization().getOrganizationId().equals(organizationId);
//                    } else {
//                        return false;
//                    }
//                }).collect(Collectors.toList());
//    }
}
