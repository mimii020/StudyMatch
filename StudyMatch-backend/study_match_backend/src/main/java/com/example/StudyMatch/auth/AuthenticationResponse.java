package com.example.StudyMatch.auth;

import com.example.StudyMatch.DTO.StudentViewDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String token;
    private StudentViewDto student;
}
