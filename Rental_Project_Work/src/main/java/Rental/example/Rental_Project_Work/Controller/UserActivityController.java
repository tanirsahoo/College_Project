package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.DTO.UserActivityDTO;
import Rental.example.Rental_Project_Work.Entity.UserActivityEntity;
import Rental.example.Rental_Project_Work.Service.UserActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class UserActivityController {

    private final UserActivityService activityService;

    @PostMapping("/track")
    public ResponseEntity<UserActivityEntity> trackUserActivity(@RequestBody UserActivityDTO dto) {
        UserActivityEntity savedActivity = activityService.saveUserActivity(dto);
        return ResponseEntity.ok(savedActivity);
    }
}
