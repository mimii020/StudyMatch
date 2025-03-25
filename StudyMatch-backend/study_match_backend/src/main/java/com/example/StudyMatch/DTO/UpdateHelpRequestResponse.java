package com.example.StudyMatch.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UpdateHelpRequestResponse {
    private ViewHelpRequestDTO viewHelpRequestDTO;
    private String jiraProjectKey;
}
