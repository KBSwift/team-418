package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EmailNotificationRepository;
import org.launchcode.homebase.models.EmailNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
