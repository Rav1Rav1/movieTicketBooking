package com.movieTicket.movieTicket.controller;

import com.movieTicket.movieTicket.model.Seat;
import com.movieTicket.movieTicket.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:5173")
public class SeatController {

    @Autowired
    private SeatRepository seatRepository;

    @GetMapping("/movie/{movieId}")
    public List<Seat> getSeatsByMovie(@PathVariable String movieId) {
        return seatRepository.findByMovieId(movieId);
    }

    @PostMapping("/movie/{movieId}/book")
    public ResponseEntity<?> bookSeats(@PathVariable String movieId, @RequestBody List<String> seatNumbers) {
        List<Seat> seats = seatRepository.findByMovieId(movieId);

        for (String seatNum : seatNumbers) {
            Seat seat = seats.stream()
                    .filter(s -> s.getSeatNumber().equals(seatNum))
                    .findFirst().orElse(null);

            if (seat == null || seat.isBooked()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Seat " + seatNum + " is already booked or invalid");
            }
        }

        // Mark seats as booked
        for (String seatNum : seatNumbers) {
            Seat seat = seats.stream()
                    .filter(s -> s.getSeatNumber().equals(seatNum))
                    .findFirst().get();
            seat.setBooked(true);
            seatRepository.save(seat);
        }
        return ResponseEntity.ok("Seats booked successfully");
    }
}

