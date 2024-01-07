package org.launchcode.homebase.controllers;

import org.launchcode.homebase.models.EmailRequest;
import org.launchcode.homebase.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest)

    {
        try {
            emailService.sendEmail(emailRequest.getEquipmentId(), emailRequest.getFilterId(), emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getMessage());
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Failed to send email: " + ex.getMessage());
        }
    }
}
