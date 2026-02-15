package com.oceanview.resort.service;

import com.oceanview.resort.Payment;
import com.oceanview.resort.Reservation;
import com.oceanview.resort.repository.PaymentRepository;
import com.oceanview.resort.repository.ReservationRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    public PaymentService(PaymentRepository paymentRepository, ReservationRepository reservationRepository) {
        this.paymentRepository = paymentRepository;
        this.reservationRepository = reservationRepository;
    }

    public Payment makePayment(Payment payment, String cardNumber) {

        Reservation reservation = reservationRepository.findById(payment.getReservationId()).orElse(null);

        if (reservation == null) {
            throw new RuntimeException("Reservation not found!");
        }

        // take last 4 digits only
        String last4 = cardNumber.substring(cardNumber.length() - 4);

        payment.setReservationNumber(reservation.getReservationNumber());
        payment.setCardLast4Digits(last4);
        payment.setAmount(reservation.getTotalBill());
        payment.setStatus("SUCCESS");

        // Save payment
        Payment savedPayment = paymentRepository.save(payment);

        // Update reservation payment status
        reservation.setPaymentStatus("PAID");
        reservationRepository.save(reservation);

        return savedPayment;
    }
}
