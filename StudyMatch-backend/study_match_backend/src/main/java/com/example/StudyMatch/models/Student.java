package com.example.StudyMatch.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private Set<Skill> desiredSkills = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonManagedReference
    @JoinTable(
            name = "student_offered_skills",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> offeredSkills = new HashSet<>();

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
