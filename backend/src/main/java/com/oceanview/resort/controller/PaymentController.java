package com.oceanview.resort.controller;

import com.oceanview.resort.Payment;
import com.oceanview.resort.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> request) {

        try {
            String reservationId = request.get("reservationId");
            String cardName = request.get("cardName");
            String cardNumber = request.get("cardNumber");
            String expiryDate = request.get("expiryDate");
            String cvv = request.get("cvv");

            if (reservationId == null || reservationId.isEmpty())
                return ResponseEntity.badRequest().body("Reservation ID required!");

            if (cardName == null || cardName.isEmpty())
                return ResponseEntity.badRequest().body("Card name required!");

            if (cardNumber == null || cardNumber.length() < 12)
                return ResponseEntity.badRequest().body("Invalid card number!");

            if (expiryDate == null || expiryDate.isEmpty())
                return ResponseEntity.badRequest().body("Expiry date required!");

            if (cvv == null || cvv.length() < 3)
                return ResponseEntity.badRequest().body("Invalid CVV!");

            Payment payment = new Payment();
            payment.setReservationId(reservationId);
            payment.setCardName(cardName);
            payment.setExpiryDate(expiryDate);

            Payment savedPayment = paymentService.makePayment(payment, cardNumber);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Payment Successful!");
            response.put("payment", savedPayment);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Payment Failed: " + e.getMessage());
        }
    }
}
