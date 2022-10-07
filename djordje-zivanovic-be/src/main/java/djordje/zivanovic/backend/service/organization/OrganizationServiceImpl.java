package djordje.zivanovic.backend.service.organization;

import djordje.zivanovic.backend.exception.ApiException;
import djordje.zivanovic.backend.model.api.request.organization.OrganizationCreationRequest;
import djordje.zivanovic.backend.model.api.request.organization.OrganizationModificationRequest;
import djordje.zivanovic.backend.model.db.organization.Organization;
import djordje.zivanovic.backend.repository.OrganizationRepository;
import djordje.zivanovic.backend.repository.OrganizationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private OrganizationTypeRepository organizationTypeRepository;

    @Override
    public List<Organization> findAll() {
        return organizationRepository
                .findAll()
                .stream()
                .filter(Organization::getActive)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Organization> findById(Long organizationId) {
        return organizationRepository
                .findById(organizationId)
                .filter(Organization::getActive);
    }

    @Override
    public Organization create(OrganizationCreationRequest request) {
        Organization organization = new Organization();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            organizationRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            organization1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "create organization");
                            },
                            () -> {
                                organization.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        organization.setActive(true);
        organizationTypeRepository
                .findByOrganizationType(request.getType().toUpperCase())
                .ifPresentOrElse(
                        organization::setType,
                        () -> {
                            throw new ApiException(HttpStatus.BAD_REQUEST, "that type doesn't exist", "create organization");
                        }
                );
        organizationRepository
                .findByName(request.getName())
                .ifPresentOrElse(
                        organization1 -> {
                            throw new ApiException(HttpStatus.BAD_REQUEST, "that name already exists", "create organization");
                        },
                        () -> {
                            organization.setName(request.getName());
                        }
                );
        if (request.getAddress() != null && !request.getAddress().isBlank()) {
            organization.setAddress(request.getAddress());
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            organization.setPhone(request.getPhone());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            organization.setEmail(request.getEmail());
        }
        return organizationRepository.save(organization);
    }

    @Override
    public Organization update(Long organizationId, OrganizationModificationRequest request) {
        Optional<Organization> organizationOpt = findById(organizationId);
        organizationOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "organization with that id doesn't exist", "update organization");
        });
        Organization updated = organizationOpt.get();
        if (request.getIdentifier() != null && !request.getIdentifier().isBlank()) {
            organizationRepository
                    .findByIdentifier(request.getIdentifier())
                    .ifPresentOrElse(
                            organization1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that identifier already exists", "update organization");
                            },
                            () -> {
                                updated.setIdentifier(request.getIdentifier());
                            }
                    );
        }
        if (request.getType() != null) {
            organizationTypeRepository
                    .findByOrganizationType(request.getType().toUpperCase())
                    .ifPresentOrElse(
                            updated::setType,
                            () -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that type doesn't exist", "update organization");
                            }
                    );
        }
        if (request.getName() != null) {
            organizationRepository
                    .findByName(request.getName())
                    .ifPresentOrElse(
                            organization1 -> {
                                throw new ApiException(HttpStatus.BAD_REQUEST, "that name already exists", "update organization");
                            },
                            () -> {
                                updated.setName(request.getName());
                            }
                    );
        }
        if (request.getAddress() != null) {
            updated.setAddress(request.getAddress());
        }
        if (request.getPhone() != null) {
            updated.setPhone(request.getPhone());
        }
        if (request.getEmail() != null) {
            updated.setEmail(request.getEmail());
        }
        return organizationRepository.save(updated);
    }

    @Override
    public Void delete(Long organizationId) {
        Optional<Organization> organizationOpt = findById(organizationId);
        organizationOpt.orElseThrow(() -> {
            throw new ApiException(HttpStatus.NOT_FOUND, "organization with that id doesn't exist", "delete organization");
        });
        Organization deleted = organizationOpt.get();
        deleted.setActive(false);
        organizationRepository.save(deleted);
        return null;
    }
}
