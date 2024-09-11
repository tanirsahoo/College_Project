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
    @NotBlank(message = "Please enter PG id.")
    private String video ;
    @NotBlank(message = "Please enter PG id.")
    private String image ;
    @NotBlank(message = "Please enter PG id.")
    private String cost ;
    @NotBlank(message = "Please enter PG id.")
    private String duration ;
    @NotBlank(message = "Please enter PG id.")
    private String user_id ;
    @NotBlank(message = "Please enter PG id.")
    private String type ;
}
