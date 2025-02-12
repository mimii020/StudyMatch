package com.example.StudyMatch.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateSkillDto {
    @NotEmpty
    @NotBlank
    private String name;

    public CreateSkillDto() {
    }
}
