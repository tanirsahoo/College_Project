package Rental.example.Rental_Project_Work.controller;

import Rental.example.Rental_Project_Work.entity.PGEntity;
import Rental.example.Rental_Project_Work.service.PGService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PGEntityController {
    @Autowired
    private PGService pgService;
    @PostMapping("/pg")
    public PGEntity savePG(@Valid @RequestBody PGEntity pgEntity){
        return pgService.savePG(pgEntity);
    }
    @GetMapping("/pg")
    public List<PGEntity> fetchPGList(){
        return pgService.fetchPGList();
    }

    @GetMapping("/pg/{id}")
    public PGEntity fetchPGById(@PathVariable("id") int PG_id ){
        return pgService.fetchPGById(PG_id);
    }
}
