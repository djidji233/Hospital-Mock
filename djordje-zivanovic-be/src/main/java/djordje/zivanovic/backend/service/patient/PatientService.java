package djordje.zivanovic.backend.service.patient;

import djordje.zivanovic.backend.model.api.request.patient.PatientCreationRequest;
import djordje.zivanovic.backend.model.api.request.patient.PatientModificationRequest;
import djordje.zivanovic.backend.model.db.patient.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<Patient> findAll();

    Optional<Patient> findById(Long patientId);

    Patient create(PatientCreationRequest request);

    Patient update(Long patientId, PatientModificationRequest request);

    Void delete(Long patientId);

}
