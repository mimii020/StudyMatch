package com.example.StudyMatch.DAO;

import com.example.StudyMatch.DTO.SkillSearchDto;
import com.example.StudyMatch.DTO.SkillType;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.models.Subject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SkillSearchBySubjectDao {
    private final EntityManager entityManager;
    public List<Skill> findBySubjectIdAndName(
            Integer subjectId,
            String skillName
    ) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Skill> criteriaQuery = criteriaBuilder.createQuery(Skill.class);

        Root<Skill> skill = criteriaQuery.from(Skill.class);
        Join<Skill, Subject> skillSubjectJoin = skill.join("subject", JoinType.LEFT);

        Predicate skillNamePredicate = criteriaBuilder
                .like(skill.get("name"), "%"+ skillName +"%");

        Predicate subjectIdPredicate = criteriaBuilder.equal(skillSubjectJoin.get("id"), subjectId);

        Predicate andPredicate = criteriaBuilder.and(
                skillNamePredicate,
                subjectIdPredicate
        );

        criteriaQuery.where(andPredicate);
        criteriaQuery.select(skill).distinct(true);

        TypedQuery<Skill> query = entityManager.createQuery(criteriaQuery);
        return query.getResultList();
    }
}

