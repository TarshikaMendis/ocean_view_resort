package com.oceanview.resort.service;

import com.oceanview.resort.Reservation;
import com.oceanview.resort.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // Create Reservation
    public Reservation createReservation(Reservation reservation) {

        String reservationNumber = "RES" + System.currentTimeMillis();
        reservation.setReservationNumber(reservationNumber);

        double rate = 0;
        if (reservation.getRoomType().equalsIgnoreCase("SINGLE")) rate = 5000;
        else if (reservation.getRoomType().equalsIgnoreCase("DOUBLE")) rate = 8000;
        else if (reservation.getRoomType().equalsIgnoreCase("DELUXE")) rate = 12000;

        LocalDate checkIn = reservation.getCheckInDate();
        LocalDate checkOut = reservation.getCheckOutDate();

        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        if (nights <= 0) throw new RuntimeException("Check-out date must be after check-in date!");

        reservation.setTotalBill(nights * rate);

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() { return reservationRepository.findAll(); }

    public Reservation getReservationByNumber(String reservationNumber) {
        return reservationRepository.findByReservationNumber(reservationNumber);
    }

    public void deleteReservation(String id) {
        reservationRepository.deleteById(id);
    }

    public Reservation updateReservation(String id, Reservation updatedReservation) {

        Reservation existing = reservationRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setGuestName(updatedReservation.getGuestName());
        existing.setAddress(updatedReservation.getAddress());
        existing.setContactNumber(updatedReservation.getContactNumber());
        existing.setRoomType(updatedReservation.getRoomType());
        existing.setCheckInDate(updatedReservation.getCheckInDate());
        existing.setCheckOutDate(updatedReservation.getCheckOutDate());

        double rate = 0;
        if (existing.getRoomType().equalsIgnoreCase("SINGLE")) rate = 5000;
        else if (existing.getRoomType().equalsIgnoreCase("DOUBLE")) rate = 8000;
        else if (existing.getRoomType().equalsIgnoreCase("DELUXE")) rate = 12000;

        long nights = ChronoUnit.DAYS.between(existing.getCheckInDate(), existing.getCheckOutDate());
        if (nights <= 0) throw new RuntimeException("Check-out date must be after check-in date!");

        existing.setTotalBill(nights * rate);

        return reservationRepository.save(existing);
    }
}
