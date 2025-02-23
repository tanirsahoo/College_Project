package Rental.example.Rental_Project_Work.service;

import Rental.example.Rental_Project_Work.Entity.PGEntity;
import Rental.example.Rental_Project_Work.Repository.PGRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PGServiceImplementation implements PGService{
    @Autowired
    private PGRepository pgRepository;
    @Override
    public PGEntity savePG(PGEntity pgEntity) {
        return pgRepository.save(pgEntity);
    }

    @Override
    public List<PGEntity> fetchPGList() {
        return pgRepository.findAll();
    }

    @Override
    public PGEntity fetchPGById(int pgId) {
        return pgRepository.findById(pgId).get();
    }
}
