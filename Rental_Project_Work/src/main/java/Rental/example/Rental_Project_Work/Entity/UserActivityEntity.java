package Rental.example.Rental_Project_Work.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserActivityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int bed_id;
    private String pgname;
    private String address;
    private String state;
    private String map_location_lat;
    private String map_location_lon;
    private String pincode;
    private String pgrules;
    private String video;
    private String image;
    private String cost;
    private String duration;
    private String gender;
    private String type;

    @Column(length = 1000)
    private String description;

    private String facilities_for_bed;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
