package com.example.StudyMatch.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder()
public class StudentViewDto {
    private Integer id;
    @NotEmpty
    @NotBlank
    private String firstname;
    @NotEmpty
    @NotBlank
    private String lastname;
    @NotEmpty
    @NotBlank
    private String bio;

    private List<SkillViewDto> desiredSkills;
    private List<SkillViewDto> offeredSkills;
}
