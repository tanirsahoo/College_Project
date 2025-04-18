package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PGEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int PG_id;

    @NotBlank(message = "Please enter the name of the PG")
    private String PGName;

    @NotBlank(message = "Please enter the location of the property")
    private String address;

    @NotBlank(message = "Please add the name of the state where the property belongs")
    private String state;

    @NotNull(message = "Enter the location on the map (Latitude)")
    private String map_location_lat;

    @NotNull(message = "Enter the location on the map (Longitude)")
    private String map_location_lon;

    @NotNull(message = "Please enter the pincode")
    private String pincode;
}
