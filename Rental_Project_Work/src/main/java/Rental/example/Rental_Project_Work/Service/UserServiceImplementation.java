package Rental.example.Rental_Project_Work.Service;

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
    @Autowired
    private EmailService emailService;

    @Override
    public UserEntity saveUser(UserEntity useren) {
        if (useren.getReferral_id() != null && !useren.getReferral_id().isEmpty()) {
            try {
                int referredUserId = Integer.parseInt(useren.getReferral_id());
                if (userRepositiory.findById(referredUserId).isEmpty()) {
                    throw new IllegalArgumentException("Invalid referral_id");
                }
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid referral_id format");
            }
        }

        // Generate and set verification token
        String token = java.util.UUID.randomUUID().toString();
        useren.setVerificationToken(token);
        useren.setVerified(false);

        // Save to DB
        UserEntity savedUser = userRepositiory.save(useren);

        // Send Email
        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        return savedUser;
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
