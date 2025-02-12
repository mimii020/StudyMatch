package com.example.StudyMatch.controllers;

import com.example.StudyMatch.DTO.LunchMatchRequestDTO;
import com.example.StudyMatch.DTO.ViewLunchMatchDTO;
import com.example.StudyMatch.models.User;
import com.example.StudyMatch.services.HelpRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("help-requests")
@RequiredArgsConstructor
public class HelpRequestController {
    @Autowired
    private HelpRequestService lunchMatchService;

    @PostMapping()
    public ResponseEntity<String> sendMatchRequest(
            @RequestBody LunchMatchRequestDTO lunchMatchDTO,
            Authentication authentication
            ) {

        lunchMatchService.sendMatchRequest(lunchMatchDTO, authentication);
        return ResponseEntity.ok("lunch match request sent successfully");

    }

    @PutMapping(value = "/sent-requests/{matchId}/accept")
    public ResponseEntity<String> acceptLunchMatch(
            @PathVariable("matchId") Integer matchId,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        lunchMatchService.acceptRequest(matchId, user);
        return ResponseEntity.ok("match request accepted");
    }

    @PutMapping(value = "/received-requests/{matchId}/deny")
    public ResponseEntity<String> denyLunchMatch(
            @PathVariable Integer matchId,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        lunchMatchService.denyRequest(matchId, user);
        return ResponseEntity.ok("match request denied");
    }


    //Optional Body: You can pass a body to ResponseEntity.ok(), which will be included in the response. If no body is provided, it will return an empty response body with a status of 200
    @GetMapping(value = "/sent-requests")
    public ResponseEntity<List<ViewLunchMatchDTO>> getSentRequests(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<ViewLunchMatchDTO> sentMatches = lunchMatchService.getSentRequests(user);
        return ResponseEntity.ok(sentMatches);
    }

    @GetMapping(value = "/received-requests")
    public ResponseEntity<List<ViewLunchMatchDTO>> getReceivedRequests(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<ViewLunchMatchDTO> receivedMatches = lunchMatchService.getReceivedRequests(user);
        return ResponseEntity.ok(receivedMatches);
    }

}
