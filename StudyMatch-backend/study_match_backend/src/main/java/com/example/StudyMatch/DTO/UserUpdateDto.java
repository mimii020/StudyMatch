package com.example.StudyMatch.DTO;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    @Size(max = 50)
    private String firstname;
    @Size(max = 50)
    private String lastname;
    @Size(max = 300)
    private String bio;
}
