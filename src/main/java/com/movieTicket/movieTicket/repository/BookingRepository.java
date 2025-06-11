package com.movieTicket.movieTicket.repository;

import com.movieTicket.movieTicket.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByMovieId(String movieId);
}
