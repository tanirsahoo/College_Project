package Rental.example.Rental_Project_Work.Service;

import Rental.example.Rental_Project_Work.DTO.UserActivityDTO;
import Rental.example.Rental_Project_Work.Entity.UserActivityEntity;

public interface UserActivityService {
    UserActivityEntity saveUserActivity(UserActivityDTO dto);
}
