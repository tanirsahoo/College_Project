package Rental.example.Rental_Project_Work.Controller;

import Rental.example.Rental_Project_Work.Entity.LoginRequest;
import Rental.example.Rental_Project_Work.Entity.UserEntity;
import Rental.example.Rental_Project_Work.Repository.UserRepository;
import Rental.example.Rental_Project_Work.Service.EmailService;
import Rental.example.Rental_Project_Work.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Registration")   // http://127.0.0.1:9000/Registration/users
public class UserEntityController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService ;
    @Autowired
    private UserRepository userRepository;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int TOKEN_LENGTH = 30;  // You can adjust the length
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public static boolean matchPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    // Function to generate a random string token
    public static String generateVerificationToken() {
        SecureRandom random = new SecureRandom();  // SecureRandom for better randomness
        StringBuilder token = new StringBuilder();

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            token.append(CHARACTERS.charAt(randomIndex));
        }

        return token.toString();
    }

    // Function to generate a token with Base64 encoding (if needed)
    public static String generateBase64Token() {
        byte[] randomBytes = new byte[24];  // Generate 24-byte random token
        SecureRandom random = new SecureRandom();
        random.nextBytes(randomBytes);

        // Convert bytes to Base64 string
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }



    @PostMapping("/users") //Signin
    public UserEntity saveUser(@Valid @RequestBody UserEntity useren){
        String token = generateVerificationToken() ;
        System.out.println(token);
//        emailService.sendVerificationEmail(useren.getEmail() , token);
        useren.setVerificationToken(token);
        useren.setVerified(false);
        useren.setPassword(hashPassword(useren.getPassword()));
        return userService.saveUser(useren) ;
    }
    @PostMapping("/users/login")
    public ResponseEntity<Boolean> login_check(@RequestBody LoginRequest loginRequest) {
        Optional<UserEntity> user = userRepository.findByEmailAndIsVerifiedTrue(loginRequest.getEmail());
//        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
        if (user.isPresent() && matchPassword(loginRequest.getPassword() , user.get().getPassword())) {
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
    @GetMapping("users/verify")
    public String verifyUser(@RequestParam("token") String token) {
        Optional<UserEntity> optionalUser = userRepository.findByVerificationToken(token);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            user.setVerified(true);
            user.setVerificationToken(null); // Optional: clear token after verification
            userRepository.save(user);
            return "Email verified successfully!";
        } else {
            return "Invalid or expired token.";
        }
    }

}
