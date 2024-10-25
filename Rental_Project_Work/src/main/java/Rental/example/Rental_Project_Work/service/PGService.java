package Rental.example.Rental_Project_Work.service;

import Rental.example.Rental_Project_Work.entity.PGEntity;

import java.util.List;

public interface PGService {
    PGEntity savePG(PGEntity pgEntity);

    List<PGEntity> fetchPGList();

    PGEntity fetchPGById(int pgId);
}
