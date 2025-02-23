package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.Entity.Bed;
import Rental.example.Rental_Project_Work.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/beds")
public class BedController {

    @Autowired
    private BedService bedService;

    @GetMapping
    public List<Bed> getAllBeds() {
        return bedService.getAllBeds();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bed> getBedById(@PathVariable int id) {
        Optional<Bed> bed = bedService.getBedById(id);
        return bed.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/bedupdate")
    public Bed addBed(@RequestBody Bed bed) {
        return bedService.addBed(bed);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Bed> updateBed(@PathVariable int id, @RequestBody Bed updatedBed) {
//        try {
//            return ResponseEntity.ok(bedService.updateBed(id, updatedBed));
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBed(@PathVariable int id) {
//        bedService.deleteBed(id);
//        return ResponseEntity.noContent().build();
//    }

    @GetMapping("/single")
    public List<Bed> getSingleBeds() {
        return bedService.getBedsByType("Single Bed");
    }

    @GetMapping("/Dual")
    public List<Bed> getDualBeds() {
        return bedService.getBedsByType("Dual Bed");
    }

    @GetMapping("/Triple")
    public List<Bed> getTripleBeds() {
        return bedService.getBedsByType("Triple Bed");
    }

    @GetMapping("/Dorm")
    public List<Bed> getDormitoryBeds() {
        return bedService.getBedsByType("Dormatory");
    }
}
