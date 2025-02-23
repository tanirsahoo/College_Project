package Rental.example.Rental_Project_Work.Repository;

import Rental.example.Rental_Project_Work.Entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List ;

@Repository
public interface BedRepository extends JpaRepository<Bed, Integer> {
    List<Bed> findByType(String type);
    // Additional custom queries can be added here
}
