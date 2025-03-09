package com.example.StudyMatch.services;

import com.example.StudyMatch.DTO.SkillViewDto;
import com.example.StudyMatch.DTO.StudentViewDto;
import com.example.StudyMatch.Security.JwtService;
import com.example.StudyMatch.auth.AuthenticationRequest;
import com.example.StudyMatch.auth.AuthenticationResponse;
import com.example.StudyMatch.auth.RegistrationRequest;
import com.example.StudyMatch.auth.Token;

import com.example.StudyMatch.models.Admin;
import com.example.StudyMatch.models.RolesEnum;
import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.repositories.AdminRepository;
import com.example.StudyMatch.repositories.StudentRepository;
import com.example.StudyMatch.repositories.TokenRepository;
import com.example.StudyMatch.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.example.StudyMatch.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public void register(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        switch (request.getRole()) {
            case STUDENT -> registerStudent(request);
            case ADMIN -> registerAdmin(request);
            default -> throw new RuntimeException("Invalid role");
        }


    }

    private void registerAdmin(RegistrationRequest request) {
        Admin admin = (Admin) Admin.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .accountLocked(false)
                .accountEnabled(true)
                .build();

        adminRepository.save(admin);
    }

    private void registerStudent(RegistrationRequest request) {
        Student student = (Student) Student.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .accountLocked(false)
                .accountEnabled(true)
                .build();

        studentRepository.save(student);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user =((User)auth.getPrincipal());
        claims.put("fullname", user.fullName());
        var jwtToken = jwtService.generateToken(claims, user);
        saveUserToken(user, jwtToken);
        if (user.getRole() == RolesEnum.STUDENT) {
            Student student = studentRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new RuntimeException("student not found"));
            List<SkillViewDto> desiredSkills = student.getDesiredSkills().stream().map(
                    (skill) -> SkillViewDto.builder()
                            .id(skill.getId())
                            .name(skill.getName())
                            .build()
            ).toList();

            List<SkillViewDto> offeredSkills = student.getOfferedSkills().stream().map(
                    (skill) -> SkillViewDto.builder()
                            .id(skill.getId())
                            .name(skill.getName())
                            .build()
                    )
                    .toList();
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .student(StudentViewDto.builder()
                            .id(student.getId())
                            .firstname(student.getFirstname())
                            .lastname(student.getLastname())
                            .bio(student.getBio())
                            .desiredSkills(desiredSkills)
                            .offeredSkills(offeredSkills)
                            .build()
                    )
                    .build();
        }
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);
    }

    public void logout(HttpServletRequest request) {

        //extract the user token

        var header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer")) {
            return;
        }
        //change the token to expired and revoked
        var jwt = header.substring(7);
        var storedToken = tokenRepository.findByToken(jwt).orElse(null);

        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }

        //save the changes to the token table
        //clear the security context

    }
}
