package com.example.StudyMatch.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LunchMatchRequestDTO {
    private Integer receiverId;
    private LocalDateTime requestDate;

}
