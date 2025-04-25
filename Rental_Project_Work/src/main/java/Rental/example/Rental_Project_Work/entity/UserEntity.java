package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.bind.annotation.RequestMapping;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id ;

    @NotBlank(message = "Please add Username")
    private String username ;

    @NotBlank(message = "Please add Email ID of the User")
    @Email
    private String email ;

    @NotBlank(message = "Please set a password for your account")
    private String password ;

    @NotBlank(message = "Please enter your address")
    private String address ;

    private String referral_id ;

    @NotBlank(message = "Please add your contact number")
    @Size(min = 11, max = 16)
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid contact number format")
    private String contact_number ;
    @Column(name = "is_verified")
    private boolean isVerified = false;

    @Column(name = "verification_token")
    private String verificationToken ;
}
