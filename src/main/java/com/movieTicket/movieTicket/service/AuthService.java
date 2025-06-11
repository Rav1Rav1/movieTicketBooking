package com.movieTicket.movieTicket.service;


import com.movieTicket.movieTicket.dto.AuthRequest;
import com.movieTicket.movieTicket.dto.AuthResponse;
import com.movieTicket.movieTicket.model.User;
import com.movieTicket.movieTicket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {


    @Autowired
    private UserRepository userRepository;


    public AuthResponse signup(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        userRepository.save(user);
        return new AuthResponse("Signup successful");
    }


    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new RuntimeException("Email not found");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        return new AuthResponse("Login successful");
    }

    public AuthResponse getData(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return new AuthResponse("User found: " + user.getName() + ", " + user.getEmail());
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

}
