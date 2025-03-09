package com.example.StudyMatch.DAO;

import com.example.StudyMatch.DTO.SkillSearchDto;
import com.example.StudyMatch.DTO.SkillType;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StudentSearchDao {
    private final EntityManager entityManager;
    public List<Student> findBySkillsOrName(
            String firstname,
            String lastname,
            List<SkillSearchDto> skills
    ) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Student> criteriaQuery = criteriaBuilder.createQuery(Student.class);

        Root<Student> student = criteriaQuery.from(Student.class);

        Join<Student, Skill> desiredSkillsJoin = student.join("desiredSkills", JoinType.LEFT);
        Join<Student, Skill> offeredSkillsJoin = student.join("offeredSkills", JoinType.LEFT);

        student.fetch("desiredSkills", JoinType.LEFT);
        student.fetch("offeredSkills", JoinType.LEFT);

        Predicate firstnamePredicate = criteriaBuilder
                .like(student.get("firstname"), "%"+ firstname +"%");

        Predicate lastnamePredicate = criteriaBuilder
                .like(student.get("lastname"), "%"+ lastname +"%");

        List<Predicate> skillPredicates = new ArrayList<>();

        for (SkillSearchDto skillSearchDto : skills) {
            if (skillSearchDto.getSkillType() == SkillType.DESIRED) {
                Predicate desiredPredicate = criteriaBuilder.equal(
                        desiredSkillsJoin.get("id"),
                        skillSearchDto.getId());
                skillPredicates.add(desiredPredicate);
            } else if (skillSearchDto.getSkillType() == SkillType.OFFERED) {
                Predicate offeredpredicate = criteriaBuilder.equal(
                        offeredSkillsJoin.get("id"),
                        skillSearchDto.getId()
                );
                skillPredicates.add(offeredpredicate);
            }
        }

        Predicate finalSkillPredicate = criteriaBuilder.or(skillPredicates.toArray(new Predicate[0]));

        Predicate orPredicate = criteriaBuilder.or(
                firstnamePredicate,
                lastnamePredicate,
                finalSkillPredicate
        );

        criteriaQuery.where(orPredicate);
        criteriaQuery.select(student).distinct(true);

        TypedQuery<Student> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }
}
