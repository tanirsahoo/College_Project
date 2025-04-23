package Rental.example.Rental_Project_Work.Controller;

        import Rental.example.Rental_Project_Work.Service.PaymentService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.*;
        import org.springframework.web.bind.annotation.*;

        import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent/{bedId}")
    public ResponseEntity<?> createPaymentIntent(@PathVariable int bedId) {
        try {
            String clientSecret = paymentService.createPaymentIntent(bedId);
            return ResponseEntity.ok(Map.of("clientSecret", clientSecret));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
