package com.studycompanion.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HelloController {
    private final StudySessionRepository studySessionRepository;

    public HelloController(StudySessionRepository studySessionRepository){
        this.studySessionRepository = studySessionRepository;
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Study-Companion!";
    }

    @PostMapping("/api/sessions")
    public void createSession(@RequestBody StudySession session) {
        studySessionRepository.save(session);
        System.out.println("Received session: " + session.getDurationSeconds());
    }
}