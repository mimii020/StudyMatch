package com.example.StudyMatch.services;

;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ForgeService {

    @Value("${forge.api.url}")
    private String forgeUrl;

    @Value("${forge.api.token}")
    private String apiToken;


    public String createJiraProject(String student1, String student2) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiToken);
        headers.setContentType(MediaType.APPLICATION_JSON);


        Map<String, String> payload = new HashMap<>();
        payload.put("student1", student1);
        payload.put("student2", student2);


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(
                forgeUrl + "/createStudyProject",
                new HttpEntity<>(payload, headers),
                Map.class
        );


        return (String) response.getBody().get("key");
    }
}