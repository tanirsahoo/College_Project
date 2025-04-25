package Rental.example.Rental_Project_Work.Service;

import Rental.example.Rental_Project_Work.Entity.Bed;
import Rental.example.Rental_Project_Work.DTO.BedWithPGDTO;
import Rental.example.Rental_Project_Work.Repository.BedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BedService {

    @Autowired
    private BedRepository bedRepository;

    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    public Optional<Bed> getBedById(int id) {
        return bedRepository.findById(id);
    }

    public Bed addBed(Bed bed) {
        return bedRepository.save(bed);
    }

    public Bed updateBed(int id, Bed updatedBed) {
        return bedRepository.findById(id)
                .map(bed -> {
                    bed.setPg(updatedBed.getPg()); // Corrected this line
                    bed.setVideo(updatedBed.getVideo());
                    bed.setImage(updatedBed.getImage());
                    bed.setCost(updatedBed.getCost());
                    bed.setDuration(updatedBed.getDuration());
                    bed.setUser_id(updatedBed.getUser_id());
                    bed.setType(updatedBed.getType());
                    return bedRepository.save(bed);
                })
                .orElseThrow(() -> new RuntimeException("Bed not found with id " + id));
    }

    public void deleteBed(int id) {
        bedRepository.deleteById(id);
    }

    public List<Bed> getBedsByType(String type) {
        return bedRepository.findByType(type);
    }

    public List<BedWithPGDTO> fetchBedsWithPGDetails() {
        return bedRepository.fetchAllBedsWithPG();
    }
}
