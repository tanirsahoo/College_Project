package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.*;
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
    @Column(name = "pg_id")
    private String pgId;
    private String images ;
    private String videos ;
    private String pg_rules ;
}
