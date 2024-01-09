package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.FilterChangeRepository;
import org.launchcode.homebase.models.EmailNotification;
import org.launchcode.homebase.models.FilterChangeHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/filter-history")
public class FilterChangeController {

    @Autowired
    private FilterChangeRepository filterChangeRepository;
    @GetMapping("/")
    public List<FilterChangeHistory> getFilterChangeHistory () {
        return filterChangeRepository.findAll();
    }

    @GetMapping("/{equipmentId}")
    public ResponseEntity<List<FilterChangeHistory>> getByEquipmentId(@PathVariable Long equipmentId) {
        List<FilterChangeHistory> historyList = filterChangeRepository.findByEquipmentId(equipmentId);
        return ResponseEntity.ok(historyList);
    }
    @GetMapping("/date")
    public ResponseEntity<List<FilterChangeHistory>> getByDateRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<FilterChangeHistory> historyList = filterChangeRepository.findByDateOfChangeBetween(startDate, endDate);
        return ResponseEntity.ok(historyList);
    }
}
