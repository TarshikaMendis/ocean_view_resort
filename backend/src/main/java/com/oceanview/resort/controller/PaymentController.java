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
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    private static final String RAZORPAY_KEY = "YOUR_KEY_ID";
    private static final String RAZORPAY_SECRET = "YOUR_KEY_SECRET";

    // 1️ Create Razorpay order
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> requestMap) throws RazorpayException {
        String reservationId = (String) requestMap.get("reservationId");
        double amountDouble = Double.parseDouble(requestMap.get("amount").toString());
        int amount = (int) (amountDouble); // Razorpay requires amount in cents/paise

        RazorpayClient client = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "LKR");
        orderRequest.put("receipt", "resv_" + reservationId);

        Order order = client.Orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("key", RAZORPAY_KEY);

        return response;
    }

    // 2️ Confirm payment and store in DB
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, Object> requestMap) {

        String reservationId = (String) requestMap.get("reservationId");
        String paymentId = (String) requestMap.get("paymentId");
        String orderId = (String) requestMap.get("orderId");
        String signature = (String) requestMap.get("signature");

        // Save payment info
        Payment payment = new Payment();
        payment.setReservationId(reservationId);
        payment.setPaymentId(paymentId);
        payment.setOrderId(orderId);
        payment.setSignature(signature);
        payment.setStatus("PAID");
        paymentRepository.save(payment);

        // Update reservation (optional: you can add a new field paymentStatus in Reservation)
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if(reservation != null){
            // optional: set a paymentStatus field
            // reservation.setPaymentStatus("PAID");
            reservationRepository.save(reservation);
        }

        return ResponseEntity.ok("Payment confirmed and saved.");
    }
}
