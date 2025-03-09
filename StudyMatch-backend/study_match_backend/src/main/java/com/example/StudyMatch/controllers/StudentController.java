package com.example.StudyMatch.controllers;


import com.example.StudyMatch.DTO.SkillType;
import com.example.StudyMatch.DTO.StudentSearchDto;
import com.example.StudyMatch.DTO.UserUpdateDto;
import com.example.StudyMatch.DTO.StudentViewDto;
import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.models.User;
import com.example.StudyMatch.services.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/search")
    public ResponseEntity<List<StudentViewDto>> findBySkillsOrName(
            @RequestBody StudentSearchDto studentSearchRequest) {
        List<StudentViewDto> studentViewDtos = this.studentService.findBySkillsOrName(
                studentSearchRequest.getFirstname(),
                studentSearchRequest.getLastname(),
                studentSearchRequest.getSkills()
                );
        return ResponseEntity.ok(studentViewDtos);
    }

    @PreAuthorize("hasRole('STUDENT') and (#studentId != authentication.principal.id)")
    @GetMapping("/{studentId}")
    public ResponseEntity<StudentViewDto> getStudentById(@PathVariable Integer studentId) {
        StudentViewDto student = this.studentService.getStudentById(studentId);
        return ResponseEntity.ok(student);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/me")
    public ResponseEntity<StudentViewDto> getMyProfile(Authentication authentication) {
        User authneticatedUser = (User) authentication.getPrincipal();
        StudentViewDto student = this.studentService.getStudentById(authneticatedUser.getId());
        return ResponseEntity.ok(student);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/me/skills")
    public ResponseEntity<User> addSkill(Authentication authentication,
                                         @RequestParam Integer skillId,
                                         @RequestParam SkillType skillType) {
        User authenticatedUser = (User) authentication.getPrincipal();
        User user = this.studentService.addSkill(authenticatedUser.getId(), skillId, skillType);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @DeleteMapping("/me/skills/{skillId}")
    public ResponseEntity<String> deleteStudentSkill(Authentication authentication,
                                                     @PathVariable Integer skillId,
                                                     @RequestParam SkillType skillType) {
        Student student = (Student) authentication.getPrincipal();
        this.studentService.deleteStudentSkill(student.getId(), skillId, skillType);
        return ResponseEntity.ok("student skill deleted successfully");
    }


    @PreAuthorize("hasRole('STUDENT')")
    @PatchMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<StudentViewDto> updateUser(
            Authentication authentication,
            @RequestBody @Valid UserUpdateDto userUpdateDto) {
        User authenticatedUser = (User) authentication.getPrincipal();
        StudentViewDto studentViewDto = this.studentService.updateUser(authenticatedUser.getId(), userUpdateDto);
        return ResponseEntity.ok(studentViewDto);
    }
}
