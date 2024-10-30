package Rental.example.Rental_Project_Work.repository;

import Rental.example.Rental_Project_Work.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositiory extends JpaRepository<UserEntity, Integer> {
}
