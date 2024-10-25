package Rental.example.Rental_Project_Work.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

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
    @Size(min=7,max=10)
    private String contact_number ;
}
