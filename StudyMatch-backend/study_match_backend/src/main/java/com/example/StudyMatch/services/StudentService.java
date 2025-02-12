package com.example.StudyMatch.services;

import com.example.StudyMatch.DAO.StudentSearchDao;
import com.example.StudyMatch.DTO.*;
import com.example.StudyMatch.models.RolesEnum;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentSearchDao studentSearchDao;

    @Autowired
    private SkillService skillService;

    //search for a student using firstname, lastname or desired/offered skills
    public List<StudentViewDto> findBySkillsOrName(
            String firstname,
            String lastname,
            List<SkillSearchDto> skills
            ) {
        List<Student> students = this.studentSearchDao.findBySkillsOrName(firstname, lastname, skills);
        return students.stream().map((student) -> StudentViewDto.builder()
                .id(student.getId())
                .firstname(student.getFirstname())
                .lastname(student.getLastname())
                .bio(student.getBio())
                .build()
                ).toList();
    }

    //retrieve student by id
    public StudentViewDto getStudentById(Integer studentId) {
        Student student =  this.studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("student not found"));
        if (student.getRole() != RolesEnum.STUDENT) {
            throw new RuntimeException("user is not a student");
        }

        return StudentViewDto.builder()
                .id(student.getId())
                .firstname(student.getFirstname())
                .lastname(student.getLastname())
                .bio(student.getBio())
                .desiredSkills(student.getDesiredSkills().stream().map(
                        (skill)-> SkillViewDto.builder()
                                .id(skill.getId())
                                .name(skill.getName())
                                .build()
                ).collect(Collectors.toList()))
                .offeredSkills(student.getOfferedSkills().stream().map(
                        (skill)-> SkillViewDto.builder()
                                .id(skill.getId())
                                .name(skill.getName())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }
    //add new skill (desired or offered)
    @Transactional
    public Student addSkill(Integer studentId, Integer skillId, SkillType skillType) {
        Student student = this.studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("student not found"));
        Skill skill = skillService.getSkillById(skillId);
        if (skillType == SkillType.DESIRED) {
            student.addDesiredSkill(skill);
        }

        else if (skillType == SkillType.OFFERED) {
            student.addOfferedSkill(skill);
        }
        this.studentRepository.save(student);
        return student;
    }
    //update user info
    @Transactional
    public StudentViewDto updateUser(Integer studentId, UserUpdateDto userUpdateDto) {
        Student student = this.studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("student not found"));
        if (userUpdateDto.getFirstname() != null) {
            student.setFirstname(userUpdateDto.getFirstname());
        }

        if (userUpdateDto.getLastname() != null) {
            student.setLastname(userUpdateDto.getLastname());
        }

        if (userUpdateDto.getBio() != null) {
            student.setBio(userUpdateDto.getBio());
        }

        Student updatedStudent = this.studentRepository.save(student);
        return StudentViewDto.builder()
                .id(updatedStudent.getId())
                .firstname(updatedStudent.getFirstname())
                .lastname(updatedStudent.getLastname())
                .bio(updatedStudent.getBio())
                .build();
    }

    @Transactional
    public void deleteStudentSkill(Integer studentId, Integer skillId, SkillType skillType) {
        Student student = this.studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("student not found"));
        switch (skillType) {
            case DESIRED -> student.getDesiredSkills().removeIf((skill) -> skill.getId().equals(skillId));
            case OFFERED -> student.getOfferedSkills().removeIf((skill) -> skill.getId().equals(skillId));
            default -> throw new RuntimeException("invalid skill type");
        }

        this.studentRepository.save(student);
    }
}
