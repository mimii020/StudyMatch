package com.example.StudyMatch.controllers;

import com.example.StudyMatch.DTO.CreateHelpRequestDTO;
import com.example.StudyMatch.DTO.UpdateHelpRequestDto;
import com.example.StudyMatch.DTO.UpdateHelpRequestResponse;
import com.example.StudyMatch.DTO.ViewHelpRequestDTO;
import com.example.StudyMatch.models.HelpRequest;
import com.example.StudyMatch.services.ForgeService;
import com.example.StudyMatch.services.HelpRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.View;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@PreAuthorize("hasRole('STUDENT')")
@RestController
@RequestMapping("help-requests")
@RequiredArgsConstructor
public class HelpRequestController {
    @Autowired
    private HelpRequestService helpRequestService;

    @PostMapping
    public ResponseEntity<ViewHelpRequestDTO> sendMatchRequest(
            @RequestBody CreateHelpRequestDTO createHelpRequestDTO,
            Authentication authentication
            ) {

        ViewHelpRequestDTO helpRequest = helpRequestService.sendHelpRequest(createHelpRequestDTO, authentication);
        return ResponseEntity.ok(helpRequest);

    }

    @PatchMapping("/{requestId}")
    public ResponseEntity<UpdateHelpRequestResponse> updateHelpRequestStatus(
            @PathVariable("requestId") Integer requestId,
            @RequestBody  UpdateHelpRequestDto helpRequestDto) {
        UpdateHelpRequestResponse helpRequest = helpRequestService.updateRequestStatus(requestId, helpRequestDto.getStatus());
        return ResponseEntity.ok(helpRequest);
    }
    

    @GetMapping(value = "/sent")
    public ResponseEntity<List<ViewHelpRequestDTO>> getSentRequests() {
        List<ViewHelpRequestDTO> sentHelpRequests = helpRequestService.getSentRequests();
        return ResponseEntity.ok(sentHelpRequests);
    }

    @GetMapping(value = "/received")
    public ResponseEntity<List<ViewHelpRequestDTO>> getReceivedRequests() {
        List<ViewHelpRequestDTO> receivedHelpRequests = helpRequestService.getReceivedRequests();
        return ResponseEntity.ok(receivedHelpRequests);
    }

}
