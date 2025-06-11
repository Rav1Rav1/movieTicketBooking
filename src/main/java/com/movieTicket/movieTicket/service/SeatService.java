package com.movieTicket.movieTicket.service;

import com.movieTicket.movieTicket.model.Seat;
import com.movieTicket.movieTicket.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getSeatsByMovie(String movieId) {
        return seatRepository.findByMovieId(movieId);
    }

    public String bookSeats(String movieId, List<String> seatNumbers) {
        List<Seat> availableSeats = seatRepository.findByMovieId(movieId);

        // Filter out already booked or invalid seats
        List<String> alreadyBooked = seatNumbers.stream()
                .filter(seatNum -> {
                    Optional<Seat> s = availableSeats.stream()
                            .filter(seat -> seat.getSeatNumber().equals(seatNum))
                            .findFirst();
                    return s.isEmpty() || s.get().isBooked();
                })
                .collect(Collectors.toList());

        if (!alreadyBooked.isEmpty()) {
            return "Seats already booked or invalid: " + alreadyBooked;
        }

        // Mark seats as booked
        for (String seatNum : seatNumbers) {
            Seat seat = availableSeats.stream()
                    .filter(s -> s.getSeatNumber().equals(seatNum))
                    .findFirst()
                    .get();

            seat.setBooked(true);
            seatRepository.save(seat);
        }

        return "Seats successfully booked: " + seatNumbers;
    }
}

