package Rental.example.Rental_Project_Work.Repository;

import Rental.example.Rental_Project_Work.Entity.MapFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapFeatureRepository extends JpaRepository<MapFeature, Integer> {
    List<MapFeature> findByPgId(String pgId);
}
