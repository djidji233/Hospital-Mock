package djordje.zivanovic.backend.service.examination;

import djordje.zivanovic.backend.model.api.request.examination.ExaminationCreationRequest;
import djordje.zivanovic.backend.model.api.request.examination.ExaminationModificationRequest;
import djordje.zivanovic.backend.model.db.examination.Examination;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {

    List<Examination> findAll();

    Optional<Examination> findById(Long examinationId);

    Examination create(ExaminationCreationRequest request);

    Examination update(Long examinationId, ExaminationModificationRequest request);

    Void delete(Long examinationId);

}
