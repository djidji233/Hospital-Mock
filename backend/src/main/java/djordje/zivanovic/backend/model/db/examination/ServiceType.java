package djordje.zivanovic.backend.model.db.examination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SERVICE_TYPE")
public class ServiceType {

    @Id
    @Column(name = "SERVICE_TYPE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceTypeId;

    @Column(name = "SERVICE_TYPE", nullable = false)
    @Enumerated(EnumType.STRING)
    private ServiceTypeEnum serviceType;

}
