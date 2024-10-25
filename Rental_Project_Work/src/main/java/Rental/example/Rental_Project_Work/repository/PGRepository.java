package Rental.example.Rental_Project_Work.repository;

import Rental.example.Rental_Project_Work.entity.PGEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PGRepository extends JpaRepository<PGEntity, Integer> {
}
