package com.example.StudyMatch.controllers;

import com.example.StudyMatch.DTO.CreateSubjectDto;
import com.example.StudyMatch.models.Subject;
import com.example.StudyMatch.services.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("subjects")
@RequiredArgsConstructor
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Subject> addSubject(@RequestBody @Valid CreateSubjectDto createSubjectDto) {
        Subject subject = this.subjectService.addSubject(createSubjectDto);
        return ResponseEntity.ok(subject);
    }
    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = this.subjectService.getAll();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Integer id) {
        Subject subject = this.subjectService.getSubjectById(id);
        return ResponseEntity.ok(subject);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public Subject updateSubject(@PathVariable Integer id, @RequestBody @Valid CreateSubjectDto updateSubjectDto) {
        return this.subjectService.updateSubject(id, updateSubjectDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Integer id) {
        this.subjectService.deleteSubject(id);
        return ResponseEntity.ok("subject deleted successfully");
    }

}
