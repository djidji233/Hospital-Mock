package djordje.zivanovic.backend.controller.examination;

import djordje.zivanovic.backend.model.api.request.examination.ExaminationCreationRequest;
import djordje.zivanovic.backend.model.api.request.examination.ExaminationModificationRequest;
import djordje.zivanovic.backend.model.db.examination.Examination;
import djordje.zivanovic.backend.service.examination.ExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/examination")
@CrossOrigin
public class ExaminationController {

    @Autowired
    private ExaminationService examinationService;

    @GetMapping
    public ResponseEntity<List<Examination>> getAllExaminations() {
        return ResponseEntity.ok(examinationService.findAll());
    }

    @GetMapping("/{examinationId}")
    public ResponseEntity<Examination> getExaminationById(@PathVariable Long examinationId) {
        return ResponseEntity.of(examinationService.findById(examinationId));
    }

    @PostMapping
    public ResponseEntity<Examination> createExamination(@Valid @RequestBody ExaminationCreationRequest request) {
        return new ResponseEntity<>(examinationService.create(request), HttpStatus.CREATED);
    }

    @PatchMapping("/{examinationId}")
    public ResponseEntity<Examination> updateExamination(@PathVariable Long examinationId, @Valid @RequestBody ExaminationModificationRequest request) {
        return ResponseEntity.ok(examinationService.update(examinationId, request));
    }

    @DeleteMapping("/{examinationId}")
    public ResponseEntity<Void> deleteExamination(@PathVariable Long examinationId) {
        return new ResponseEntity<>(examinationService.delete(examinationId), HttpStatus.NO_CONTENT);
    }

}
