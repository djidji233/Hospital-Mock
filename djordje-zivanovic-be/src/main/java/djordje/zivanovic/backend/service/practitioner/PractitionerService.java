package djordje.zivanovic.backend.service.practitioner;

import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerCreationRequest;
import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerModificationRequest;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;

import java.util.List;
import java.util.Optional;

public interface PractitionerService {

    List<Practitioner> findAll(Long organizationId);

    Optional<Practitioner> findById(Long practitionerId);

    Practitioner create(PractitionerCreationRequest request);

    Practitioner update(Long practitionerId, PractitionerModificationRequest request);

    Void delete(Long practitionerId);

}
