package com.example.StudyMatch.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class StudentSearchDto {
    private String firstname;
    private String lastname;
    private List<SkillSearchDto> skills;
}
