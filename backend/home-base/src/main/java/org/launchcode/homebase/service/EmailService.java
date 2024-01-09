package org.launchcode.homebase.service;


import org.launchcode.homebase.data.EmailNotificationRepository;
import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.data.UserRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.EmailNotification;
import org.launchcode.homebase.models.Equipment;
import org.launchcode.homebase.models.Filter;
import org.launchcode.homebase.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
import com.sendgrid.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmailService {
    @Autowired
    private EmailNotificationRepository emailNotificationRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private FilterService filterService;

    @Autowired
    private UserRepository userRepository;

    private final SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));

    public void sendEmail(int equipmentId, int filterId, String userEmail, String subject, String message) throws Exception {
        //Code for sendEmail
        try {
                Email from = new Email("kenjigw@gmail.com");
                Email toEmail = new Email(userEmail);
                Content content = new Content("text/plain", message);
                Mail mail = new Mail(from, subject, toEmail, content);

                Request request = new Request();
                request.setMethod(Method.POST);
                request.setEndpoint("mail/send");
                request.setBody(mail.build());
                Response response = sg.api(request);

                System.out.println(response.getStatusCode());
                System.out.println(response.getBody());
                System.out.println(response.getHeaders());

        } catch (IOException ex) {
            throw new Exception("Failed to send email: " + ex.getMessage());
        }

    }

    private void logEmailNotification(int equipmentId, int filterId, String to, String subject, String message) {

        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found with id = " + equipmentId));

        Filter filter = filterRepository.findById(filterId)
                .orElseThrow(() -> new ResourceNotFoundException("Filter not found with id = " + filterId));

        EmailNotification emailNotification = new EmailNotification();
        emailNotification.setRecipientEmail(to);
        emailNotification.setEquipmentId(equipmentId);
        emailNotification.setEquipmentName(equipment.getName());
        emailNotification.setFilterId(filterId);
        emailNotification.setSentTimestamp(new Date());

        emailNotificationRepository.save(emailNotification);

    }

    @Scheduled(cron = "0 0 5 * * ?") // Run every day at 5 am
    public void sendEmailsForDueFilters() {
        try {
            List<Filter> filtersDueForChange = filterService.getFiltersToChangeInNext7Days();
            for (Filter filter : filtersDueForChange) {
                sendEmailForFilterChange(filter);
            }
        } catch (Exception ex) {
            System.err.println("Error sending emails for due filters: " + ex.getMessage());
        }
    }

    private void sendEmailForFilterChange(Filter filter) throws Exception {
        // Create email content and subject
        String emailContent = "Your filter for " + filter.getEquipment().getName() + " is due for change.";
        String emailSubject = "Filter Change Reminder";

        // Send email
        sendEmail(
                filter.getEquipment().getId(),
                filter.getId(),
                "recipient@example.com", // Replace with the actual recipient email
                emailSubject,
                emailContent
        );

        // Log email notification
        logEmailNotification(
                filter.getEquipment().getId(),
                filter.getId(),
                "recipient@example.com", // Replace with the actual recipient email
                emailSubject,
                emailContent
        );
    }
}