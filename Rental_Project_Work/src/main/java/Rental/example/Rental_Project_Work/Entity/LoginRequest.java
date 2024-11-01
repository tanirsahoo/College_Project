package Rental.example.Rental_Project_Work.Entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public class LoginRequest {
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    @Getter
    @Setter
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Getter
    @Setter
    private String password;
}
