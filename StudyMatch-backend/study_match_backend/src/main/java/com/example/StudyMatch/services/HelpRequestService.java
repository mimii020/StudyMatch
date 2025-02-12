package com.example.StudyMatch.services;

import com.example.StudyMatch.DTO.LunchMatchRequestDTO;
import com.example.StudyMatch.DTO.ViewLunchMatchDTO;
import com.example.StudyMatch.models.HelpRequest;
import com.example.StudyMatch.models.HelpRequestStatus;
import com.example.StudyMatch.repositories.HelpRequestRepository;
import com.example.StudyMatch.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.example.StudyMatch.models.User;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HelpRequestService {
    @Autowired
    private HelpRequestRepository lunchMatchRepository;
    @Autowired
    private UserRepository userRepository;
    //sendRequest
    public void sendMatchRequest(LunchMatchRequestDTO lunchMatchDTO, Authentication authentication) {
        User sender = (User) authentication.getPrincipal();
        Integer receiverId = lunchMatchDTO.getReceiverId();
        LocalDateTime requestDate = lunchMatchDTO.getRequestDate();
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("sender not found"));


        if(sender != null && receiver != null) {
            HelpRequest matchRequest = HelpRequest.builder()
                    .date(requestDate)
                    .sender(sender)
                    .receiver(receiver)
                    .status(HelpRequestStatus.PENDING)
                    .build();
            lunchMatchRepository.save(matchRequest);

        }

    }
    //AcceptRequest
    public void acceptRequest(Integer lunchMatchId, User user) {
        HelpRequest lunchMatch = lunchMatchRepository.findById(lunchMatchId)
                .orElseThrow(() -> new RuntimeException("match not found"));
        if(lunchMatch.getReceiver().equals(user)) {
            lunchMatch.setStatus(HelpRequestStatus.ACCEPTED);
            lunchMatchRepository.save(lunchMatch);
        }

    }
    //DeclineRequest
    public void denyRequest(Integer lunchMatchId, User user) {
        HelpRequest lunchMatch = lunchMatchRepository.findById(lunchMatchId)
                .orElseThrow(() -> new RuntimeException("match not found"));
        if(lunchMatch.getReceiver().equals(user)) {
            lunchMatchRepository.delete(lunchMatch);
        }

    }
    //getSentRequests
    public List<ViewLunchMatchDTO> getSentRequests(User user) {
        List<HelpRequest> sentLunchMatches = lunchMatchRepository.findBySenderId(user.getId());
        return sentLunchMatches.stream().map(lunchMatch -> {
            ViewLunchMatchDTO lunchMatchDTO = ViewLunchMatchDTO.builder()
                    .matchId(lunchMatch.getId())
                    .receiverId(user.getId())
                    .receiverUsername(user.fullName())
                    .senderId(lunchMatch.getSender().getId())
                    .senderUsername(lunchMatch.getSender().fullName())
                    .status(String.valueOf(lunchMatch.getStatus()))
                    .build();
            return lunchMatchDTO;
        }).toList();

    }

    //getReceivedRequests
    public List<ViewLunchMatchDTO> getReceivedRequests(User user) {
        List<HelpRequest> receivedRequests = lunchMatchRepository.findByReceiverId(user.getId());
        return receivedRequests.stream().map(lunchMatch -> {
            ViewLunchMatchDTO lunchMatchDTO = ViewLunchMatchDTO.builder()
                    .matchId(lunchMatch.getId())
                    .receiverId(user.getId())
                    .receiverUsername(user.fullName())
                    .senderId(lunchMatch.getSender().getId())
                    .senderUsername(lunchMatch.getSender().fullName())
                    .status(String.valueOf(lunchMatch.getStatus()))
                    .build();
            return lunchMatchDTO;
        }).toList();

    }
}
