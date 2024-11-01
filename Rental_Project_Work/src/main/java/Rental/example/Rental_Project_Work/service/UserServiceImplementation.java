package Rental.example.Rental_Project_Work.service;

import Rental.example.Rental_Project_Work.Entity.UserEntity;
import Rental.example.Rental_Project_Work.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    private UserRepository userRepositiory;
    @Override
    public UserEntity saveUser(UserEntity useren) {
        // Check if referral_id matches any user_id
        if (useren.getReferral_id() != null && !useren.getReferral_id().isEmpty()) {
            // Parse referral_id to integer if it's supposed to represent user_id
            int referredUserId;
            try {
                referredUserId = Integer.parseInt(useren.getReferral_id());
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid referral_id format");
            }

            // Verify if the referral_id exists as user_id in the database
            Optional<UserEntity> referredUser = userRepositiory.findById(referredUserId);
            if (!referredUser.isPresent()) {
                throw new IllegalArgumentException("Invalid referral_id: No user found with user_id " + referredUserId);
            }
        }

        // Save the user if referral_id is valid or not provided
        return userRepositiory.save(useren);
    }

    @Override
    public List<UserEntity> fetchUserList() {
        return userRepositiory.findAll();
    }

    @Override
    public UserEntity fetchUserById(int userId) {
        return userRepositiory.findById(userId).get();
    }

    @Override
    public void deleteUserById(int userId) {
            userRepositiory.deleteById(userId);

    }

    @Override
    public UserEntity updateUser(int userId, UserEntity useren) {
        UserEntity userDB = userRepositiory.findById(userId).get();

        if(Objects.nonNull(useren.getUsername())&&
        !"".equalsIgnoreCase(useren.getUsername()))
            userDB.setUsername(useren.getUsername());

        if(Objects.nonNull(useren.getEmail())&&
                !"".equalsIgnoreCase(useren.getEmail()))
            userDB.setEmail(useren.getEmail());

        if(Objects.nonNull(useren.getPassword())&&
                !"".equalsIgnoreCase(useren.getPassword()))
            userDB.setPassword(useren.getPassword());

        if(Objects.nonNull(useren.getAddress())&&
                !"".equalsIgnoreCase(useren.getAddress()))
            userDB.setAddress(useren.getAddress());

        if(Objects.nonNull(useren.getReferral_id())&&
                !"".equalsIgnoreCase(useren.getReferral_id()))
            userDB.setReferral_id(useren.getReferral_id());

        if(Objects.nonNull(useren.getContact_number())&&
                !"".equalsIgnoreCase(useren.getContact_number()))
            userDB.setContact_number(useren.getContact_number());


        return userRepositiory.save(userDB);
    }
}
