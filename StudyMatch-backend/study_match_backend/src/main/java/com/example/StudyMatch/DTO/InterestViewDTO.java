package com.example.StudyMatch.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

@AllArgsConstructor
@Setter
@Getter
@Builder
public class InterestViewDTO {
    @NumberFormat
    @NotEmpty
    private Integer id;
    @NotEmpty
    @NotBlank
    private String category;
    @NotEmpty
    @NotBlank
    private String name;
    @NotEmpty
    @NotBlank
    private String description;
}
