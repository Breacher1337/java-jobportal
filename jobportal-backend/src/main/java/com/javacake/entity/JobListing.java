package com.javacake.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_listings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private boolean remote;
    private String salaryRange;

    private LocalDateTime postedAt;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
