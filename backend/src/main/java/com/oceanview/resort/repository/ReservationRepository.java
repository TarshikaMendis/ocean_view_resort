package com.oceanview.resort.repository;

import com.oceanview.resort.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservationRepository extends MongoRepository<Reservation, String> {

    Reservation findByReservationNumber(String reservationNumber);
}
