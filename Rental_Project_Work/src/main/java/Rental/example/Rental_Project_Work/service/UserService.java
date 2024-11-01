package Rental.example.Rental_Project_Work.service;

import Rental.example.Rental_Project_Work.Entity.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity saveUser(UserEntity user);

    List<UserEntity> fetchUserList();

    UserEntity fetchUserById(int userId);

    void deleteUserById(int userId);

    UserEntity updateUser(int userId, UserEntity useren);
}
