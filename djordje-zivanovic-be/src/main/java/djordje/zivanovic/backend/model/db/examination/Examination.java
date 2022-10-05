package djordje.zivanovic.backend.model.db.examination;

import djordje.zivanovic.backend.model.db.organization.Organization;
import djordje.zivanovic.backend.model.db.patient.Patient;
import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.lang.module.FindException;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "EXAMINATION")
public class Examination {

    @Id
    @Column(name = "EXAMINATION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examinationId;

    @Column(name = "IDENTIFIER", unique = true)
    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExaminationStatusEnum status;

    @ManyToOne
    @JoinColumn(name = "SERVICE_TYPE_ID", referencedColumnName = "SERVICE_TYPE_ID", nullable = false)
    private ServiceType serviceType;

    @Column(name = "PRIORITY")
    @Enumerated(EnumType.STRING)
    private ExaminationPriorityEnum priority;

    @Column(name = "START_DATE")
    private Date startDate;

    @Column(name = "END_DATE")
    private Date endDate;

    @Column(name = "DIAGNOSIS")
    private String diagnosis;

    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ORGANIZATION_ID")
    private Organization organization;

    @ManyToOne
    @JoinColumn(name = "PATIENT_ID", referencedColumnName = "PATIENT_ID")
    private Patient patient;

    @ManyToMany(mappedBy = "examinations", fetch = FetchType.LAZY)
    private List<Practitioner> practitioners;

}
