package Rental.example.Rental_Project_Work.Service;

import Rental.example.Rental_Project_Work.Entity.PGEntity;

import java.util.List;

public interface PGService {
    PGEntity savePG(PGEntity pgEntity);

    List<PGEntity> fetchPGList();

    PGEntity fetchPGById(int pgId);
}
