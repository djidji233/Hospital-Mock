package djordje.zivanovic.backend.service.organization;

import djordje.zivanovic.backend.model.api.request.organization.OrganizationCreationRequest;
import djordje.zivanovic.backend.model.api.request.organization.OrganizationModificationRequest;
import djordje.zivanovic.backend.model.db.organization.Organization;

import java.util.List;
import java.util.Optional;

public interface OrganizationService {
    List<Organization> findAll();
    Optional<Organization> findById(Long organizationId);
    Organization create(OrganizationCreationRequest request);

    Organization update(Long organizationId, OrganizationModificationRequest request);

    Void delete(Long organizationId);

}
