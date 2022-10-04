package djordje.zivanovic.backend.model.db.examination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Date;

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
    @JoinColumn(name = "SERVICE_TYPE", referencedColumnName = "SERVICE_TYPE", nullable = false)
    private ServiceType serviceType;

    @Column(name = "PRIORITY")
    private ExaminationPriorityEnum priority;

    @Column(name = "START_DATE")
    private Date startDate;

    @Column(name = "END_DATE")
    private Date endDate;

    @Column(name = "DIAGNOSIS")
    private String diagnosis;

}
