package djordje.zivanovic.backend.controller.practitioner;

import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerCreationRequest;
import djordje.zivanovic.backend.model.api.request.practitioner.PractitionerModificationRequest;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import djordje.zivanovic.backend.service.practitioner.PractitionerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/practitioner")
@CrossOrigin
public class PractitionerController {

    @Autowired
    private PractitionerService practitionerService;

    @GetMapping
    public ResponseEntity<List<Practitioner>> getAllPractitioners() {
        return ResponseEntity.ok(practitionerService.findAll());
    }

    @GetMapping("/{practitionerId}")
    public ResponseEntity<Practitioner> getPractitionerById(@PathVariable Long practitionerId) {
        return ResponseEntity.of(practitionerService.findById(practitionerId));
    }

    @PostMapping
    public ResponseEntity<Practitioner> createPractitioner(@Valid @RequestBody PractitionerCreationRequest request) {
        return new ResponseEntity<>(practitionerService.create(request), HttpStatus.CREATED);
    }

    @PatchMapping("/{practitionerId}")
    public ResponseEntity<Practitioner> updatePractitioner(@PathVariable Long practitionerId, @Valid @RequestBody PractitionerModificationRequest request) {
        return ResponseEntity.ok(practitionerService.update(practitionerId, request));
    }

    @DeleteMapping("/{practitionerId}")
    public ResponseEntity<Void> deletePractitioner(@PathVariable Long practitionerId) {
        return new ResponseEntity<>(practitionerService.delete(practitionerId), HttpStatus.NO_CONTENT);
    }

}
