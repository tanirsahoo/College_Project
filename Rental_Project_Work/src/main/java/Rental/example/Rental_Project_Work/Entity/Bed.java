package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.*;
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
    private int Bed_id;

    @ManyToOne
    @JoinColumn(name = "pg_id")
    private PGEntity pg;

    private String video;
    private String image;
    private String cost;
    private String duration;
    private String user_id;
    private String gender;
    private String type; // Single Bed, Dual Bed, Triple Bed or Dormitory

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String facilities_for_bed;
}
