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
public class MapFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int feature_id ;
    @NotBlank(message = "Please enter feature type.")
    private String feature_type ;
    @NotBlank(message = "Please enter the PG ID.")
    private String pg_id;
    private String images ;
    private String videos ;
    private String pg_rules ;
}
