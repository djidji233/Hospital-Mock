package djordje.zivanovic.backend.model.api.request.organization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationModificationRequest {

    @Size(min = 5, message = "Minimal number of characters is 5")
    private String identifier;

    private String type;

    @Size(min = 5, message = "Minimal number of characters is 5")
    private String name;

    private String address;

    private String phone;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

}
