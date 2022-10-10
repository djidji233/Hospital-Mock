package djordje.zivanovic.backend.model.api.request.examination;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExaminationCreationRequest {

    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Service type is required")
    private String serviceType;

    private String priority;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME, pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date startDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME, pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date endDate;

    private String diagnosis;

    @NotNull(message = "Organization is required")
    private Long organizationId;

    @NotNull(message = "Patient is required")
    private Long patientId;

    @NotNull(message = "Practitioners are required")
    private List<Long> practitionerIds;

}
