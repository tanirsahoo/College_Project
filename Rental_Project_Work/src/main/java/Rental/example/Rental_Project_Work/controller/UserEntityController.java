package Rental.example.Rental_Project_Work.controller;

import Rental.example.Rental_Project_Work.entity.UserEntity;
import Rental.example.Rental_Project_Work.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserEntityController {
    @Autowired
    private UserService userService;
    @PostMapping("/users")
    public UserEntity saveUser(@Valid @RequestBody UserEntity useren){
        return userService.saveUser(useren);
    }
    @GetMapping("/users")
    public List<UserEntity> fetchUserList(){
        return userService.fetchUserList();
    }
    @GetMapping("/users/{id}")
    public UserEntity fetchUserById(@PathVariable("id") int user_id){
        return userService.fetchUserById(user_id);

    }
    @DeleteMapping("/users/{id}")
    public void deleteUserById(@PathVariable("id") int user_id){
        userService.deleteUserById(user_id);
    }

    @PutMapping("/users/{id}")
    public UserEntity updateUser(@PathVariable("id") int user_id,@Valid @RequestBody UserEntity useren){
        return userService.updateUser(user_id,useren);
    }

}
