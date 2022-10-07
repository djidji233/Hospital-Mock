package djordje.zivanovic.backend.model.db.organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import djordje.zivanovic.backend.model.db.examination.Examination;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORGANIZATION")
public class Organization {

    @Id
    @Column(name = "ORGANIZATION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long organizationId;

    @Column(name = "IDENTIFIER", unique = true)
    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    @Column(name = "ACTIVE", nullable = false)
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "ORGANIZATION_TYPE_ID", referencedColumnName = "ORGANIZATION_TYPE_ID", nullable = false)
    private OrganizationType type;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotBlank(message = "Name is mandatory")
    @Size(min = 5, message = "Minimal number of characters is 5")
    private String name;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "EMAIL")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @OneToMany(mappedBy = "organization")
    @JsonIgnore
    private List<Examination> examinations;

}
