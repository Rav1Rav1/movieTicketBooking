package com.movieTicket.movieTicket.repository;

import com.movieTicket.movieTicket.model.Seat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SeatRepository extends MongoRepository<Seat, String> {
    List<Seat> findByMovieId(String movieId);
}
