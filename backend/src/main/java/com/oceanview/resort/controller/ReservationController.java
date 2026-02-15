package com.oceanview.resort.controller;

import com.oceanview.resort.Reservation;
import com.oceanview.resort.ReservationDTO;
import com.oceanview.resort.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Create a new reservation
    @PostMapping
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {

        if (reservation.getGuestName() == null || reservation.getGuestName().isEmpty())
            return ResponseEntity.badRequest().body("Guest name is required!");
        if (reservation.getContactNumber() == null || reservation.getContactNumber().isEmpty())
            return ResponseEntity.badRequest().body("Contact number is required!");
        if (reservation.getRoomType() == null || reservation.getRoomType().isEmpty())
            return ResponseEntity.badRequest().body("Room type is required!");
        if (reservation.getCheckInDate() == null)
            return ResponseEntity.badRequest().body("Check-in date is required!");
        if (reservation.getCheckOutDate() == null)
            return ResponseEntity.badRequest().body("Check-out date is required!");

        Reservation savedReservation = reservationService.createReservation(reservation);
        return ResponseEntity.ok(savedReservation);
    }

    // GET all reservations with payment status (for Admin Dashboard)
    @GetMapping("/all")
    public ResponseEntity<List<ReservationDTO>> getAllReservationsWithPaymentStatus() {
        List<ReservationDTO> reservations = reservationService.getAllReservationsWithPaymentStatus();
        return ResponseEntity.ok(reservations);
    }

    // GET reservation by reservation number
    @GetMapping("/number/{reservationNumber}")
    public ResponseEntity<?> getReservationByNumber(@PathVariable String reservationNumber) {
        Reservation reservation = reservationService.getReservationByNumber(reservationNumber);
        if (reservation == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reservation);
    }

    // DELETE reservation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable String id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok("Reservation Deleted Successfully!");
    }

    // UPDATE reservation by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable String id, @RequestBody Reservation updatedReservation) {
        Reservation reservation = reservationService.updateReservation(id, updatedReservation);
        if (reservation == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reservation);
    }
}
