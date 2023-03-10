package djordje.zivanovic.backend.model.db.organization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ORGANIZATION_TYPE")
public class OrganizationType {

    @Id
    @Column(name = "ORGANIZATION_TYPE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long organizationTypeId;

    @Column(name = "ORGANIZATION_TYPE", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrganizationTypeEnum organizationType;

}
