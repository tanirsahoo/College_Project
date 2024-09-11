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
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Bed_id ;
    @NotBlank(message = "Please enter PG id.")
    private String PG_id ;
    @NotBlank(message = "Please enter Video file names.")
    private String video ;
    @NotBlank(message = "Please enter Image file name.")
    private String image ;
    @NotBlank(message = "Please enter the cost.")
    private String cost ;
    @NotBlank(message = "Please enter duration for which the agreement has been settled.")
    private String duration ;
    @NotBlank(message = "Please enter user ID.")
    private String user_id ;
    @NotBlank(message = "Please enter the type of property(2 Bed room , 1 Bed room , 3 Bed room etc).")
    private String type ;
}
