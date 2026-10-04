package com.studycompanion.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

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
    public StudySession createSession(@RequestBody StudySession session) {
        System.out.println("Received session: " + session.getDurationSeconds());
        return studySessionRepository.save(session);
    }

    @GetMapping("/api/sessions")
    public List<StudySession> getSessions() {
        return studySessionRepository.findAll();
    }
}