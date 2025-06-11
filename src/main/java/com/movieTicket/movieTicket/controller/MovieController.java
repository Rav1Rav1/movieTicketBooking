package com.movieTicket.movieTicket.controller;

import com.movieTicket.movieTicket.model.Booking;
import com.movieTicket.movieTicket.model.Movie;
import com.movieTicket.movieTicket.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
        Movie movie = movieService.getMovieById(id);
        if (movie != null) {
            return ResponseEntity.ok(movie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Book seats for a movie - using your Booking model directly
    @PostMapping("/movies/{movieId}/book")
    public ResponseEntity<String> bookSeats(
            @PathVariable String movieId,
            @RequestBody Booking booking) {
        try {
            movieService.bookSeats(
                    movieId,
                    booking.getSeats(),
                    booking.getDate(),
                    booking.getTime(),
                    booking.getEmail()
            );
            return ResponseEntity.ok("Seats booked successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error booking seats: " + e.getMessage());
        }
    }

    @GetMapping("/movies/{movieId}/booked-seats")
    public ResponseEntity<List<Integer>> getBookedSeats(@PathVariable String movieId) {
        List<Integer> bookedSeats = movieService.getBookedSeats(movieId);
        return ResponseEntity.ok(bookedSeats);
    }

    @PostMapping("/movies")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        movieService.addMovies(movie);
        return ResponseEntity.status(201).body(movie);
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable String id,
            @RequestBody Movie updatedMovie) {
        Movie movie = movieService.updateMovie(id, updatedMovie);
        return ResponseEntity.ok(movie);
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
