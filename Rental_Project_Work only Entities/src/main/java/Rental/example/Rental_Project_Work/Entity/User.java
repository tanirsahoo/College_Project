package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id ;
    @NotBlank(message = "Please add Username")
    private String username ;
    @NotBlank(message = "Please add Email ID of the user")
    private String email ;
    @NotBlank(message = "Please set a password for your account")
    private String password ;
    @NotBlank(message = "Please enter your address")
    private String Address ;
    private int referral_id ;
    @NotBlank(message = "Please add your contact number")
    private int contact_number ;
}