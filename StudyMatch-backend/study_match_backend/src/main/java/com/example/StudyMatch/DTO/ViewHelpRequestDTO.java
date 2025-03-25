package com.example.StudyMatch.DTO;

import com.example.StudyMatch.models.HelpRequestStatus;
import com.example.StudyMatch.models.Subject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ViewHelpRequestDTO {
    private Integer helpRequestId;
    private Integer senderId;
    private Integer receiverId;
    private String senderUsername;
    private String receiverUsername;
    private HelpRequestStatus status;
    private String description;
    private SubjectViewDto subject;
}
