package com.example.StudyMatch.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Student extends User {
    private String bio;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonManagedReference
    @JoinTable(
            name = "student_desired_skills",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> desiredSkills = new ArrayList<>();

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonManagedReference
    @JoinTable(
            name = "student_offered_skills",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> offeredSkills = new ArrayList<>();

    public void addOfferedSkill(Skill skill) {
        if (!offeredSkills.contains(skill)) {
            skill.getStudentsOfferingThisSkill().add(this);
            offeredSkills.add(skill);
        }
    }

    public void addDesiredSkill(Skill skill) {
        if (!desiredSkills.contains(skill)) {
            skill.getStudentsDesiringThisSkill().add(this);
            desiredSkills.add(skill);
        }
    }
}
