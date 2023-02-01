package djordje.zivanovic.backend.controller.patient;

import djordje.zivanovic.backend.model.api.request.patient.PatientCreationRequest;
import djordje.zivanovic.backend.model.api.request.patient.PatientModificationRequest;
import djordje.zivanovic.backend.model.db.patient.Patient;
import djordje.zivanovic.backend.service.patient.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.findAll());
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long patientId) {
        return ResponseEntity.of(patientService.findById(patientId));
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@Valid @RequestBody PatientCreationRequest request) {
        return new ResponseEntity<>(patientService.create(request), HttpStatus.CREATED);
    }

    @PatchMapping("/{patientId}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long patientId, @Valid @RequestBody PatientModificationRequest request) {
        return ResponseEntity.ok(patientService.update(patientId, request));
    }

    @DeleteMapping("/{patientId}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long patientId) {
        return new ResponseEntity<>(patientService.delete(patientId), HttpStatus.NO_CONTENT);
    }

}
