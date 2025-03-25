package com.example.StudyMatch.services;

import com.example.StudyMatch.DTO.UpdateHelpRequestResponse;
import com.example.StudyMatch.DTO.CreateHelpRequestDTO;

import com.example.StudyMatch.DTO.SubjectViewDto;
import com.example.StudyMatch.DTO.ViewHelpRequestDTO;
import com.example.StudyMatch.models.*;
import com.example.StudyMatch.repositories.HelpRequestRepository;
import com.example.StudyMatch.repositories.StudentRepository;
import com.example.StudyMatch.repositories.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HelpRequestService {
    @Autowired
    private HelpRequestRepository helpRequestRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ForgeService forgeService;
    //sendRequest
    public ViewHelpRequestDTO sendHelpRequest(CreateHelpRequestDTO helpRequestDTO, Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        Integer senderId = principal.getId();
        Integer receiverId = helpRequestDTO.getReceiverId();
        Integer subjectId = helpRequestDTO.getSubjectId();

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("subject not found"));

        Student receiver =  studentRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("receiver not found"));

        Student sender =  studentRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("sender not found"));

        if (sender == null || receiver == null || subject == null) {
           throw new EntityNotFoundException("entity was not found");
        }

        HelpRequest helpRequest = HelpRequest.builder()
                .createdAt(LocalDateTime.now())
                .sender(sender)
                .receiver(receiver)
                .subject(subject)
                .description(helpRequestDTO.getDescription())
                .status(HelpRequestStatus.PENDING)
                .build();
        HelpRequest createdHelpRequest =  helpRequestRepository.save(helpRequest);
        return ViewHelpRequestDTO.builder()
                .helpRequestId(createdHelpRequest.getId())
                .receiverId(createdHelpRequest.getReceiver().getId())
                .senderId(createdHelpRequest.getSender().getId())
                .senderUsername(createdHelpRequest.getSender().getUsername())
                .receiverUsername(createdHelpRequest.getReceiver().getUsername())
                .subject(SubjectViewDto.builder()
                        .id(createdHelpRequest.getSubject().getId())
                        .name(createdHelpRequest.getSubject().getName())
                        .build())
                .description(createdHelpRequest.getDescription())
                .status(createdHelpRequest.getStatus())
                .build();

    }

    public UpdateHelpRequestResponse updateRequestStatus(Integer helpRequestId, HelpRequestStatus status) {
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
        HelpRequest updatedHelpRequest = helpRequestRepository.save(helpRequest);

        ViewHelpRequestDTO viewHelpRequestDTO = ViewHelpRequestDTO.builder()
                .helpRequestId(updatedHelpRequest.getId())
                .status(updatedHelpRequest.getStatus())
                .subject(SubjectViewDto.builder()
                        .id(updatedHelpRequest.getSubject().getId())
                        .name(updatedHelpRequest.getSubject().getName())
                        .build())
                .receiverId(updatedHelpRequest.getReceiver().getId())
                .senderId(updatedHelpRequest.getSender().getId())
                .senderUsername(updatedHelpRequest.getSender().getUsername())
                .receiverUsername(updatedHelpRequest.getReceiver().getUsername())
                .description(updatedHelpRequest.getDescription())
                .build();

        if (status == HelpRequestStatus.ACCEPTED) {
            String projectKey = forgeService.createJiraProject(
                    updatedHelpRequest.getSender().getUsername(),
                    updatedHelpRequest.getReceiver().getUsername()
            );

            return UpdateHelpRequestResponse.builder()
                    .viewHelpRequestDTO(viewHelpRequestDTO)
                    .jiraProjectKey(projectKey)
                    .build();
        }

        else if (status == HelpRequestStatus.DENIED) {
            return UpdateHelpRequestResponse.builder()
                    .viewHelpRequestDTO(viewHelpRequestDTO)
                    .build();
        }
        return null;
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
                    .description(helpRequest.getDescription())
                    .subject(SubjectViewDto.builder()
                            .id(helpRequest.getSubject().getId())
                            .name(helpRequest.getSubject().getName())
                            .build())
                    .status(helpRequest.getStatus())
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
                    .subject(SubjectViewDto.builder()
                            .id(helpRequest.getSubject().getId())
                            .name(helpRequest.getSubject().getName())
                            .build())
                    .status(helpRequest.getStatus())
                    .description(helpRequest.getDescription())
                    .build();
        }).toList();

    }
}
