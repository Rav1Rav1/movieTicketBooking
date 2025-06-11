package com.movieTicket.movieTicket.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "seats")
public class Seat {
    @Id
    private String id;
    private String seatNumber; // e.g. A1, A2
    private boolean booked;
    private String movieId; // Reference to Movie by id
    // getters & setters
}

