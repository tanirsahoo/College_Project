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

    private String PG_id ;

    private String video ;

    private String image ;

    private String cost ;

    private String duration ;

    private String user_id ;

    private String type ; //Value will be Single Bed , Dual Bed, Triple Bed or Dormatory
}
