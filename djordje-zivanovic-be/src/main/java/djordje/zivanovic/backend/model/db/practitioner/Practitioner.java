package djordje.zivanovic.backend.model.db.practitioner;

import djordje.zivanovic.backend.model.db.GenderEnum;
import djordje.zivanovic.backend.model.db.examination.Examination;
import djordje.zivanovic.backend.model.db.organization.Organization;
import djordje.zivanovic.backend.model.db.patient.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "PRACTITIONER")
public class Practitioner {

    @Id
    @Column(name = "PRACTITIONER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long practitionerId;

    @Column(name = "IDENTIFIER", unique = true)
    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    @Column(name = "ACTIVE", nullable = false)
    private Boolean active;

    @Column(name = "NAME", nullable = false)
    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, message = "Minimal number of characters is 3")
    private String name;

    @Column(name = "SURNAME", nullable = false)
    @NotBlank(message = "Surname is mandatory")
    @Size(min = 3, message = "Minimal number of characters is 3")
    private String surname;

    @Column(name = "GENDER")
    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @Column(name = "BIRTH_DATE", nullable = false)
    private Date birthDate;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "EMAIL")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @Column(name = "QUALIFICATION")
    @Enumerated(EnumType.STRING)
    private PractitionerQualificationEnum qualification;

    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ORGANIZATION_ID")
    private Organization organization;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "PRACTITIONER_EXAMINATION",
            joinColumns = @JoinColumn(name = "PRACTITIONER_ID", referencedColumnName = "PRACTITIONER_ID"),
            inverseJoinColumns = @JoinColumn(name = "EXAMINATION_ID", referencedColumnName = "EXAMINATION_ID")
    )
    private List<Examination> examinations;

}
