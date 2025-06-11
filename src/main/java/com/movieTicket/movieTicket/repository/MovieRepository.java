package com.movieTicket.movieTicket.repository;

import com.movieTicket.movieTicket.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie, String> {
}
