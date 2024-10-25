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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int pay_id ;
    @NotBlank(message = "Please enter Bed id.")
    private int Bed_id;
    @NotBlank(message = "Please enter the cost of the Bed")
    private int Cost;
    @NotBlank(message = "Please enter User ID.")
    private int User_id;
    @NotBlank(message = "Please enter Owner id.")
    private int Owner_id;
    @NotBlank(message = "Please enter PG id.")
    private int PG_id;
}
