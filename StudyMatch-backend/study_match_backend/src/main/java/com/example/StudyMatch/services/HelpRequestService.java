package com.example.StudyMatch.services;

import com.example.StudyMatch.DTO.CreateHelpRequestDTO;

import com.example.StudyMatch.DTO.ViewHelpRequestDTO;
import com.example.StudyMatch.models.HelpRequest;
import com.example.StudyMatch.models.HelpRequestStatus;
import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.repositories.HelpRequestRepository;
import com.example.StudyMatch.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.StudyMatch.models.User;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HelpRequestService {
    @Autowired
    private HelpRequestRepository helpRequestRepository;
    @Autowired
    private StudentRepository studentRepository;
    //sendRequest
    public HelpRequest sendHelpRequest(CreateHelpRequestDTO helpRequestDTO, Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        Integer senderId = principal.getId();
        Integer receiverId = helpRequestDTO.getReceiverId();

        Student receiver =  studentRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("reciever not found"));

        Student sender =  studentRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("sender not found"));

        if (sender == null || receiver == null) {
           throw new EntityNotFoundException("entity was not found");

        }

        HelpRequest helpRequest = HelpRequest.builder()
                .createdAt(LocalDateTime.now())
                .sender(sender)
                .receiver(receiver)
                .status(HelpRequestStatus.PENDING)
                .build();
        return  helpRequestRepository.save(helpRequest);

    }

    public HelpRequest updateRequestStatus(Integer helpRequestId, HelpRequestStatus status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User principal = (User) authentication.getPrincipal();
        Integer currentStudentId = principal.getId();
        Student currentStudent = studentRepository.findById(currentStudentId)
                .orElseThrow(() -> new RuntimeException("student not found"));

        HelpRequest helpRequest = helpRequestRepository.findById(helpRequestId)
                .orElseThrow(() -> new RuntimeException("help request not found"));

        if (!helpRequest.getReceiver().getId().equals(currentStudent.getId())) {
            throw new AccessDeniedException("You are not the receiver of this request");
        }

        helpRequest.setStatus(status);
        return helpRequestRepository.save(helpRequest);

    }


    //getSentRequests
    public List<ViewHelpRequestDTO> getSentRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User principal = (User) authentication.getPrincipal();
        Integer currentStudentId = principal.getId();

        List<HelpRequest> sentHelpRequests = helpRequestRepository.findBySenderId(currentStudentId);
        return sentHelpRequests.stream().map(helpRequest -> {
            return ViewHelpRequestDTO.builder()
                    .helpRequestId(helpRequest.getId())
                    .receiverId(helpRequest.getReceiver().getId())
                    .receiverUsername(helpRequest.getReceiver().fullName())
                    .senderId(helpRequest.getSender().getId())
                    .senderUsername(helpRequest.getSender().fullName())
                    .status(String.valueOf(helpRequest.getStatus()))
                    .build();
        }).toList();

    }

    //getReceivedRequests
    public List<ViewHelpRequestDTO> getReceivedRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User principal = (User) authentication.getPrincipal();
        Integer currentStudentId = principal.getId();

        List<HelpRequest> receivedHelpRequests = helpRequestRepository.findByReceiverId(currentStudentId);

        return receivedHelpRequests.stream().map(helpRequest -> {
            return ViewHelpRequestDTO.builder()
                    .helpRequestId(helpRequest.getId())
                    .receiverId(helpRequest.getReceiver().getId())
                    .receiverUsername(helpRequest.getReceiver().fullName())
                    .senderId(helpRequest.getSender().getId())
                    .senderUsername(helpRequest.getSender().fullName())
                    .status(String.valueOf(helpRequest.getStatus()))
                    .build();
        }).toList();

    }
}
