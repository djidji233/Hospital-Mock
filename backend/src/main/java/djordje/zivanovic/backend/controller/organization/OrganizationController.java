package djordje.zivanovic.backend.controller.organization;

import djordje.zivanovic.backend.model.api.request.organization.OrganizationCreationRequest;
import djordje.zivanovic.backend.model.api.request.organization.OrganizationModificationRequest;
import djordje.zivanovic.backend.model.db.organization.Organization;
import djordje.zivanovic.backend.service.organization.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/organization")
@CrossOrigin
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @GetMapping
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        return ResponseEntity.ok(organizationService.findAll());
    }

    @GetMapping("/{organizationId}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable Long organizationId) {
        return ResponseEntity.of(organizationService.findById(organizationId));
    }

    @PostMapping
    public ResponseEntity<Organization> createOrganization(@Valid @RequestBody OrganizationCreationRequest request) {
        return new ResponseEntity<>(organizationService.create(request), HttpStatus.CREATED);
    }

    @PatchMapping("/{organizationId}")
    public ResponseEntity<Organization> updateOrganization(@PathVariable Long organizationId, @Valid @RequestBody OrganizationModificationRequest request) {
        return ResponseEntity.ok(organizationService.update(organizationId, request));
    }

    @DeleteMapping("/{organizationId}")
    public ResponseEntity<Void> deleteOrganization(@PathVariable Long organizationId) {
        return new ResponseEntity<>(organizationService.delete(organizationId), HttpStatus.NO_CONTENT);
    }

}
