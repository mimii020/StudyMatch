package com.example.StudyMatch.controllers;

import com.example.StudyMatch.DTO.InterestViewDTO;
import com.example.StudyMatch.DTO.CreateSkillDto;
import com.example.StudyMatch.DTO.SkillViewDto;
import com.example.StudyMatch.models.Skill;
import com.example.StudyMatch.services.SkillService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects/{subjectId}/skills")
@RequiredArgsConstructor
public class SkillController {
    @Autowired
    private SkillService skillService;
    //add a new interest
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Skill> addSkill(
            @PathVariable Integer subjectId,
            @RequestBody CreateSkillDto createSkillDto) {
        Skill skill = skillService.addSkill(subjectId, createSkillDto);
        return ResponseEntity.ok(skill);
    }
    //update an existing interest
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateInterest(
            @PathVariable Integer id,
            @RequestBody CreateSkillDto newInterestDTO) {
       // skillService.updateSkill(id, newInterestDTO);
        return ResponseEntity.ok("interest updated successfully");
    }
    //view all skills

    //view a specific iskill
    @GetMapping("/{id}")
    public ResponseEntity<Skill> viewInterestById(@PathVariable Integer id) {
        Skill skill = skillService.getSkillById(id);
        return ResponseEntity.ok(skill);
    }
    //delete a specific skill
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkimmByIdd(@PathVariable Integer id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping
    public List<Skill> getSkillsBySubject(@PathVariable Integer subjectId) {
        return this.skillService.getSkillsBySubject(subjectId);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SkillViewDto>> getSkillsBySubjectIdAndName(
            @PathVariable Integer subjectId,
            @RequestParam(required = false) String searchQuery
    ) {
        List<SkillViewDto> skills = skillService.searchSkills(subjectId, searchQuery);
        return ResponseEntity.ok(skills);
    }
}
