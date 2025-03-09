package com.example.StudyMatch.DTO;

import com.example.StudyMatch.models.HelpRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateHelpRequestDto {
    private HelpRequestStatus status;
}
