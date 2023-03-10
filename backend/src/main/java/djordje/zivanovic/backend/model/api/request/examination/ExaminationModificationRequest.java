package djordje.zivanovic.backend.model.api.request.examination;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExaminationModificationRequest {

    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    private String status;

    private String serviceType;

    private String priority;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endDate;

    private String diagnosis;

    private Long organizationId;

    private Long patientId;

    private List<Long> practitionerIds;

}
