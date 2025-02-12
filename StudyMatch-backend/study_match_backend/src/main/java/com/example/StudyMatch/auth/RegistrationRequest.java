package com.example.StudyMatch.auth;

import com.example.StudyMatch.models.RolesEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotNull
    private RolesEnum role;
    @NotEmpty
    @NotBlank
    private String firstname;
    @NotEmpty
    @NotBlank
    private String lastname;
    @NotEmpty
    @NotBlank
    private String email;
    @NotEmpty
    @NotBlank
    @Size(min = 8)
    private String password;
}
