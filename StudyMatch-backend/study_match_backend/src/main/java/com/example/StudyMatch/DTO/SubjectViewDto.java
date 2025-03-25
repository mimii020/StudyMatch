package com.example.StudyMatch.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder()
public class SubjectViewDto {
    @NotEmpty
    private Integer id;
    @NotEmpty
    @NotBlank
    private String name;
}
