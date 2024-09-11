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
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Owner_id ;
    @NotBlank(message = "Please enter PG id.")
    private int PG_id ;
    @NotBlank(message = "Please enter the name of the property owner")
    private String name ;
    @NotBlank(message = "Please enter the email")
    private String Email ;
    @NotBlank(message = "Please enter the address")
    private String Address ;
    @NotBlank(message = "Please enter the contact number")
    private int contact ;
    @NotBlank(message = "Please enter the pincode")
    private int pincode ;
}
