package Rental.example.Rental_Project_Work.Repository;

import Rental.example.Rental_Project_Work.Entity.UserActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserActivityRepository extends JpaRepository<UserActivityEntity, Long> {
}