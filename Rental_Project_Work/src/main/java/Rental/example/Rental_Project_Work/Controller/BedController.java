package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.Entity.Bed;
import Rental.example.Rental_Project_Work.DTO.BedWithPGDTO;
import Rental.example.Rental_Project_Work.Service.BedService;
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

    @GetMapping("/withpg")
    public List<BedWithPGDTO> getBedsWithPGDetails() {
        return bedService.fetchBedsWithPGDetails();
    }
}
