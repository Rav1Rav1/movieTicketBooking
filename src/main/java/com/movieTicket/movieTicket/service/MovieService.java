package com.movieTicket.movieTicket.service;

import com.movieTicket.movieTicket.model.Booking;
import com.movieTicket.movieTicket.model.Movie;
import com.movieTicket.movieTicket.repository.BookingRepository;
import com.movieTicket.movieTicket.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(String id) {
        return movieRepository.findById(id).orElse(null);
    }

    public void addMovies(Movie movie) {
        movieRepository.save(movie);
    }

    public Movie updateMovie(String id, Movie updatedMovie) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id " + id));

        movie.setTitle(updatedMovie.getTitle());
        movie.setDescription(updatedMovie.getDescription());
        movie.setImageUrl(updatedMovie.getImageUrl());
        movie.setGenre(updatedMovie.getGenre());

        return movieRepository.save(movie);
    }

    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }

    // ✅ Booking method with full parameters
    public void bookSeats(String movieId, List<Integer> seats, String date, String time, String email) {
        Booking booking = new Booking(null, movieId, seats, date, time, email);
        bookingRepository.save(booking);
    }

    public List<Integer> getBookedSeats(String movieId) {
        return bookingRepository.findByMovieId(movieId).stream()
                .flatMap(booking -> booking.getSeats().stream())
                .collect(Collectors.toList());
    }
}
