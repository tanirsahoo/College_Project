package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.Entity.LoginRequest;
import Rental.example.Rental_Project_Work.Entity.UserEntity;
import Rental.example.Rental_Project_Work.Repository.UserRepository;
import Rental.example.Rental_Project_Work.service.UserService;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Registration")
public class UserEntityController {
    @Autowired
    private UserService userService;
    private UserRepository userRepository;
    @PostMapping("/users")
    public UserEntity saveUser(@Valid @RequestBody UserEntity useren){
        return userService.saveUser(useren);
    }
    @PostMapping("/users/login")
    public ResponseEntity<Boolean> login_check(@RequestBody LoginRequest loginRequest) {
        // Find user by email
        Optional<UserEntity> user = userRepository.findByEmail(loginRequest.getEmail());

        // Check if user exists and the password matches
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
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
