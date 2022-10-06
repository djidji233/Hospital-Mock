package djordje.zivanovic.backend.model.api.request.patient;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientModificationRequest {
    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    @Size(min = 3, message = "Minimal number of characters is 3")
    private String name;

    @Size(min = 3, message = "Minimal number of characters is 3")
    private String surname;

    private String gender;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;

    private String address;

    private String phone;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    private Boolean deceased;

    private String maritalStatus;

    private Long organizationId;

    private Long primaryCareProviderId;
}
