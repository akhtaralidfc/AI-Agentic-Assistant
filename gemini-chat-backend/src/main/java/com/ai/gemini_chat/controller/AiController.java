package com.ai.gemini_chat.controller;

import com.ai.gemini_chat.Service.QnaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
//@AllArgsConstructor
public class AiController {
    private final QnaService qnaService;

    public AiController(QnaService qnaService) {
        this.qnaService = qnaService;
    }

    @PostMapping("/api/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> payload){
        System.out.println("Hey");
        String question=payload.get("question");
        String answer=qnaService.getAnswer(question);
        System.out.println("Hey2");

        return ResponseEntity.ok(answer);
    }
}
