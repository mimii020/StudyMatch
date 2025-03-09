package com.example.StudyMatch.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class ViewHelpRequestDTO {
    private Integer helpRequestId;
    private Integer senderId;
    private Integer receiverId;

    private String senderUsername;
    private String receiverUsername;
    private String status;
}
