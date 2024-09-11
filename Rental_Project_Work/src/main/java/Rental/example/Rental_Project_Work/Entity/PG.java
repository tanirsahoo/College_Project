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
public class PG {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int PG_id ;
    @NotBlank(message = "Please enter the location of the property")
    private String Address ;
    @NotBlank(message = "Please add the name of the state where the property belongs")
    private String State ;
    @NotBlank(message = "Enter the location on the map (Latitute)")
    private int Map_location_lat ;
    @NotBlank(message = "Enter the location on the map (Longitude)")
    private int Map_location_lon ;
    @NotBlank(message = "Please enter the pincode")
    private int pincode ;
}
