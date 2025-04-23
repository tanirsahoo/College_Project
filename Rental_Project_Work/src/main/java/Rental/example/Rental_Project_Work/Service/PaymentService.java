package Rental.example.Rental_Project_Work.Service;

import Rental.example.Rental_Project_Work.Entity.Bed;
import Rental.example.Rental_Project_Work.Repository.BedRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PaymentService {

    private final BedRepository bedRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public PaymentService(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    public String createPaymentIntent(int bedId) throws Exception {
        Optional<Bed> bedOpt = bedRepository.findById(bedId);

        if (bedOpt.isEmpty()) {
            throw new Exception("Bed with ID " + bedId + " not found.");
        }

        Bed bed = bedOpt.get();

        double costInRupees = Double.parseDouble(bed.getCost());
        int amountInPaise = (int)(costInRupees * 100); // Convert to paise

        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amountInPaise);
        params.put("currency", "inr");
        params.put("payment_method_types", List.of("card"));

        PaymentIntent intent = PaymentIntent.create(params);

        return intent.getClientSecret();
    }
}
