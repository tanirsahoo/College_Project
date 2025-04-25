package Rental.example.Rental_Project_Work.Repository;

import Rental.example.Rental_Project_Work.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByVerificationToken(String token);
    Optional<UserEntity> findByEmailAndIsVerifiedTrue(String email);

}
