package com.example.StudyMatch.repositories;

import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findBySubject(Subject subject);
}
