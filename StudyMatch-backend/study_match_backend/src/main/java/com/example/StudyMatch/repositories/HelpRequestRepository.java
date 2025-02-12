package com.example.StudyMatch.repositories;

import com.example.StudyMatch.models.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpRequestRepository extends JpaRepository<HelpRequest, Integer> {
    List<HelpRequest> findBySenderId(Integer senderId);
    List<HelpRequest> findByReceiverId(Integer receiverId);

}
