package com.example.StudyMatch.DTO;

import com.example.StudyMatch.models.Subject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateHelpRequestDTO {
    private Integer receiverId;
    private Integer subjectId;
    private String description;

}
