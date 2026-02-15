package com.oceanview.resort.controller;

import com.oceanview.resort.Payment;
import com.oceanview.resort.Reservation;
import com.oceanview.resort.repository.PaymentRepository;
import com.oceanview.resort.repository.ReservationRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    //  Replace with your Razorpay Test Keys
    private static final String RAZORPAY_KEY = "YOUR_KEY_ID";
    private static final String RAZORPAY_SECRET = "YOUR_KEY_SECRET";

    /**
     * Create Razorpay Order
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> requestMap) {
        try {
            String reservationId = (String) requestMap.get("reservationId");
            double amountDouble = Double.parseDouble(requestMap.get("amount").toString());

            // Convert to integer (LKR does not need cents)
            int amount = (int) Math.round(amountDouble);

            RazorpayClient client = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount); // amount in LKR
            orderRequest.put("currency", "LKR");
            orderRequest.put("receipt", "resv_" + reservationId);

            Order order = client.Orders.create(orderRequest);

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("key", RAZORPAY_KEY);

            return ResponseEntity.ok(response);

        } catch (RazorpayException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Razorpay order creation failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }

    /**
     * Confirm Payment and Save to Database
     */
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, Object> requestMap) {
        try {
            String reservationId = (String) requestMap.get("reservationId");
            String paymentId = (String) requestMap.get("paymentId");
            String orderId = (String) requestMap.get("orderId");
            String signature = (String) requestMap.get("signature");

            Payment payment = new Payment();
            payment.setReservationId(reservationId);
            payment.setPaymentId(paymentId);
            payment.setOrderId(orderId);
            payment.setSignature(signature);
            payment.setStatus("PAID");

            paymentRepository.save(payment);

            // Optional: update reservation with paymentStatus
            Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
            if (reservation != null) {
                // reservation.setPaymentStatus("PAID"); // Add this field if you want
                reservationRepository.save(reservation);
            }

            return ResponseEntity.ok("Payment confirmed and saved.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Payment confirmation failed: " + e.getMessage());
        }
    }
}
