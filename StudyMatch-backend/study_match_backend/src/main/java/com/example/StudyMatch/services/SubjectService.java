package com.example.StudyMatch.services;

import com.example.StudyMatch.DTO.CreateSubjectDto;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Subject;
import com.example.StudyMatch.repositories.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAll() {
        return this.subjectRepository.findAll();
    }

    public Subject getSubjectById(Integer subjectId) {
        Subject subject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException(("interest not found")));
        return subject;
    }

    public Subject addSubject(CreateSubjectDto createSubjectDto) {
        Subject subject = Subject.builder()
                .name(createSubjectDto.getName())
                .build();

        return this.subjectRepository.save(subject);
    }

    public Subject updateSubject(Integer subjectId, CreateSubjectDto updateSubjectDto) {
        Subject existingSubject = this.subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("subject not found"));
        existingSubject.setName(updateSubjectDto.getName());
        return this.subjectRepository.save(existingSubject);
    }

    public void deleteSubject(Integer subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("subject not found"));
        subjectRepository.delete(subject);
    }
}
