package com.example.StudyMatch.DTO;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder()
public class SkillSearchDto {
    private Integer id;
    private SkillType skillType;
}

