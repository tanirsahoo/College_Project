package Rental.example.Rental_Project_Work.service;

import Rental.example.Rental_Project_Work.entity.UserEntity;
import Rental.example.Rental_Project_Work.repository.UserRepositiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    private UserRepositiory userRepositiory;
    @Override
    public UserEntity saveUser(UserEntity useren) {
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
