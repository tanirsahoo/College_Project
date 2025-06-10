package Rental.example.Rental_Project_Work.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UserActivityDTO {

    private Map<String, Object> pg;  // raw PG details like pgname, address, etc.
    private String video;
    private String image;
    private String cost;
    private String duration;
    private Integer user_id;
    private String gender;
    private String type;
    private String description;
    private String facilities_for_bed;
    private int bed_id;
}
