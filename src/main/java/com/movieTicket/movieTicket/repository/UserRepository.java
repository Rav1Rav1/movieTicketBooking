package com.movieTicket.movieTicket.repository;



import com.movieTicket.movieTicket.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
