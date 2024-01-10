package org.launchcode.homebase.controllers;

import com.sendgrid.helpers.mail.objects.Email;
import org.launchcode.homebase.data.FilterChangeRepository;
import org.launchcode.homebase.service.EmailService;
import org.launchcode.homebase.models.EmailNotification;
import org.launchcode.homebase.models.FilterChangeHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5175/")
@RequestMapping("api/filter-history")
public class FilterChangeController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private FilterChangeRepository filterChangeRepository;
    @GetMapping("")
    public List<FilterChangeHistory> getFilterChangeHistory () {
        return filterChangeRepository.findAll();
    }

    @GetMapping("/{equipmentId}")
    public ResponseEntity<List<FilterChangeHistory>> getByEquipmentId(@PathVariable Long equipmentId) {
        List<FilterChangeHistory> historyList = filterChangeRepository.findByEquipmentId(equipmentId);
        return ResponseEntity.ok(historyList);
    }

    @PostMapping("")
    public ResponseEntity<String> createFilterChangeHistory(@RequestBody FilterChangeHistory filterChangeHistory) {
        try {
            filterChangeRepository.save(filterChangeHistory);
            return ResponseEntity.ok("Filter History Saved.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to save Filter Change: " + e.getMessage());
        }
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendEmailsForDueFilters() {
        try {
            System.out.println("sendEmailsForDueFilters called");
            emailService.sendEmailsForDueFilters();
            return ResponseEntity.ok("Emails sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send emails: " + e.getMessage());
        }
    }
}
