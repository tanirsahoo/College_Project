package Rental.example.Rental_Project_Work.Service;

import Rental.example.Rental_Project_Work.Entity.MapFeature;
import Rental.example.Rental_Project_Work.Repository.MapFeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MapFeatureService {

    @Autowired
    private MapFeatureRepository mapFeatureRepository;

    public List<MapFeature> getAllFeatures() {
        return mapFeatureRepository.findAll();
    }

    public Optional<MapFeature> getFeatureById(int id) {
        return mapFeatureRepository.findById(id);
    }

    public List<MapFeature> getFeaturesByPgId(String pgId) {
        return mapFeatureRepository.findByPg_id(pgId);
    }

    public MapFeature saveFeature(MapFeature mapFeature) {
        return mapFeatureRepository.save(mapFeature);
    }

    public void deleteFeature(int id) {
        mapFeatureRepository.deleteById(id);
    }
}
