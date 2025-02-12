package com.example.StudyMatch.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Skill {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToMany(mappedBy = "desiredSkills", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Student> studentsDesiringThisSkill = new ArrayList<>();

    @ManyToMany(mappedBy = "offeredSkills", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Student> studentsOfferingThisSkill = new ArrayList<>();

    @ManyToOne
    @JoinColumn
    @JsonBackReference
    private Subject subject;
    private String name;
}
