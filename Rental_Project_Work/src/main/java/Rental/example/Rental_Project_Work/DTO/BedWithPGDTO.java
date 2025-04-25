package Rental.example.Rental_Project_Work.DTO;

import Rental.example.Rental_Project_Work.Entity.Bed;
import Rental.example.Rental_Project_Work.Entity.PGEntity;

public class BedWithPGDTO {
    private Bed bed;
    private PGEntity pg;

    public BedWithPGDTO(Bed bed, PGEntity pg) {
        this.bed = bed;
        this.pg = pg;
    }

    public Bed getBed() {
        return bed;
    }

    public PGEntity getPg() {
        return pg;
    }
}
