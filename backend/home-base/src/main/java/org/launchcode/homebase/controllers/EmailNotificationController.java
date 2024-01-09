package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EmailNotificationRepository;
import org.launchcode.homebase.models.EmailNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/email-notifications")
public class EmailNotificationController {

    @Autowired
    private EmailNotificationRepository emailNotificationRepository;

    @GetMapping("/history")
    public List<EmailNotification> getEmailNotificationHistory() {
        return emailNotificationRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<EmailNotification> saveNotification(@RequestBody EmailNotification emailNotification) {
        EmailNotification _emailNotification = emailNotificationRepository.save(emailNotification);
        return new ResponseEntity<>(_emailNotification, HttpStatus.CREATED);
    }
}
