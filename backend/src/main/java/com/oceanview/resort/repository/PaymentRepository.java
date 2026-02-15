package com.oceanview.resort.repository;

import com.oceanview.resort.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}
