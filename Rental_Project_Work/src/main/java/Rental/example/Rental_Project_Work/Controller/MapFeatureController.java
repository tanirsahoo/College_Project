package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.Entity.MapFeature;
import Rental.example.Rental_Project_Work.Service.MapFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/map-features")
public class MapFeatureController {

    @Autowired
    private MapFeatureService mapFeatureService;

    @GetMapping
    public List<MapFeature> getAllFeatures() {
        return mapFeatureService.getAllFeatures();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MapFeature> getFeatureById(@PathVariable int id) {
        Optional<MapFeature> feature = mapFeatureService.getFeatureById(id);
        return feature.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/pg/{pgId}")
    public List<MapFeature> getFeaturesByPgId(@PathVariable String pgId) {
        return mapFeatureService.getFeaturesByPgId(pgId);
    }

    @PostMapping
    public MapFeature createFeature(@RequestBody MapFeature mapFeature) {
        return mapFeatureService.saveFeature(mapFeature);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable int id) {
        mapFeatureService.deleteFeature(id);
        return ResponseEntity.noContent().build();
    }
}
