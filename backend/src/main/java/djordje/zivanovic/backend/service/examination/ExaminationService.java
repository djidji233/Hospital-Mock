package djordje.zivanovic.backend.service.examination;

import djordje.zivanovic.backend.model.api.request.examination.ExaminationCreationRequest;
import djordje.zivanovic.backend.model.api.request.examination.ExaminationModificationRequest;
import djordje.zivanovic.backend.model.db.examination.Examination;
import djordje.zivanovic.backend.model.db.examination.ExaminationPriorityEnum;
import djordje.zivanovic.backend.model.db.examination.ExaminationStatusEnum;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {

    List<Examination> findAll(Long organizationId, ExaminationStatusEnum status, ExaminationPriorityEnum priority, Long practitionerId, Long patientId);

    Optional<Examination> findById(Long examinationId);

    Examination create(ExaminationCreationRequest request);

    Examination update(Long examinationId, ExaminationModificationRequest request);

    Void delete(Long examinationId);

}
