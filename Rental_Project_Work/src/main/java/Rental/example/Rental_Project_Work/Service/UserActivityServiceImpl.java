package Rental.example.Rental_Project_Work.Service.impl;

import Rental.example.Rental_Project_Work.DTO.UserActivityDTO;
import Rental.example.Rental_Project_Work.Entity.UserActivityEntity;
import Rental.example.Rental_Project_Work.Entity.UserEntity;
import Rental.example.Rental_Project_Work.Repository.UserActivityRepository;
import Rental.example.Rental_Project_Work.Repository.UserRepository;
import Rental.example.Rental_Project_Work.Service.UserActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserActivityServiceImpl implements UserActivityService {

    private final UserActivityRepository activityRepository;
    private final UserRepository userRepository;

    @Override
    public UserActivityEntity saveUserActivity(UserActivityDTO dto) {
        UserEntity user = userRepository.findById(dto.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> pg = dto.getPg();

        UserActivityEntity activity = UserActivityEntity.builder()
                .user(user)
                .bed_id(dto.getBed_id())
                .pgname((String) pg.get("pgname"))
                .address((String) pg.get("address"))
                .state((String) pg.get("state"))
                .map_location_lat((String) pg.get("map_location_lat"))
                .map_location_lon((String) pg.get("map_location_lon"))
                .pincode((String) pg.get("pincode"))
                .pgrules((String) pg.get("pgrules"))
                .video(dto.getVideo())
                .image(dto.getImage())
                .cost(dto.getCost())
                .duration(dto.getDuration())
                .gender(dto.getGender())
                .type(dto.getType())
                .description(dto.getDescription())
                .facilities_for_bed(dto.getFacilities_for_bed())
                .build();

        return activityRepository.save(activity);
    }
}
