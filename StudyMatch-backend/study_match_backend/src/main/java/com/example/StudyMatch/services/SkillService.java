package com.example.StudyMatch.services;

import com.example.StudyMatch.DAO.SkillSearchBySubjectDao;
import com.example.StudyMatch.DTO.CreateSkillDto;
import com.example.StudyMatch.DTO.SkillViewDto;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.models.Subject;
import com.example.StudyMatch.repositories.SkillRepository;
import com.example.StudyMatch.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private SkillSearchBySubjectDao skillSearchDao;
    public Skill addSkill(Integer subjectId, CreateSkillDto createSkillDto) {
        Subject subject = this.subjectService.getSubjectById(subjectId);
        if (subject == null) {
            throw new EntityNotFoundException("subject not found");
        }
        Skill skill = Skill.builder()
                .subject(subject)
                .name(createSkillDto.getName())
                .build();
        return skillRepository.save(skill);
    }
    // update a new interest
    /*public void updateSkill(Integer interestId, CreateSkillDto newInterestDTO) {
        Skill interest = interestRepository.findById(interestId)
                .orElseThrow(() -> new RuntimeException("interest not found"));
        if (newInterestDTO.getName() != null && !interest.getName().equals(newInterestDTO.getName())) {
            interest.setName(newInterestDTO.getName());
        }

     //   if (newInterestDTO.getCategory() != null && !interest.getCategory().equals(newInterestDTO.getCategory())) {
     //       interest.setCategory(newInterestDTO.getCategory());
      //  }

        if (newInterestDTO.getDescription() != null && !interest.getDescription().equals(newInterestDTO.getDescription())) {
            interest.setDescription(newInterestDTO.getDescription());
        }
        skillRepository.save(interest);

    }*/
    //view all interests
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
    //view a specific interest

    public Skill getSkillById(Integer skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException(("interest not found")));
        return skill;
    }

    //delete an interest
    public void deleteSkill(Integer skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("skill not found"));
        skillRepository.delete(skill);
    }

    public List<Skill> getSkillsBySubject(Integer subjectId) {
        Subject subject = this.subjectService.getSubjectById(subjectId);
        List<Skill> skills = this.skillRepository.findBySubject(subject);

        if (skills.isEmpty()) {
            throw new RuntimeException("skills not found");
        }
        return skills;
    }

    public List<SkillViewDto> searchSkills(Integer subjectId, String searchQuery) {
        List<Skill> skills = skillSearchDao.findBySubjectIdAndName(subjectId, searchQuery);
        List<SkillViewDto> skillsDto = skills.stream().map((skill) -> SkillViewDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .build()
        ).toList();

    return skillsDto;
    }

}
