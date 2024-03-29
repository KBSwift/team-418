package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.Equipment;
import org.launchcode.homebase.service.GoogleSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private GoogleSearchService googleSearchService;

    @GetMapping("/equipment/{id}/google-search-link")
    public ResponseEntity<String> getGoogleSearchLinkForEquipment(@PathVariable("id") int equipmentId) {
        try {
            String googleSearchLink = googleSearchService.getGoogleSearchLinkForEquipment(equipmentId);
            return new ResponseEntity<>(googleSearchLink, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error triggering Google search: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/equipment")
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        List<Equipment> equipment = equipmentRepository.findAll();

        if (equipment.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(equipment, HttpStatus.OK);
    }

    @GetMapping("/equipment/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable("id") int id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Equipment with id = " + id));

        return new ResponseEntity<>(equipment, HttpStatus.OK);
    }

    @PostMapping("/equipment")
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
        Equipment _equipment = equipmentRepository.save(new Equipment(equipment.getName(), equipment.getFilters(), equipment.getFilterLifeDays()));
        return new ResponseEntity<>(_equipment, HttpStatus.CREATED);
    }

    @PutMapping("/equipment/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable("id") int id, @RequestBody Equipment equipment) {
        Equipment _equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Equipment with id = " + id));

        _equipment.setName(equipment.getName());
        _equipment.setFilters(equipment.getFilters());
        _equipment.setFilterLifeDays(equipment.getFilterLifeDays());

        return new ResponseEntity<>(equipmentRepository.save(_equipment), HttpStatus.OK);
    }

    @DeleteMapping("/equipment/{id}")
    public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable("id") int id) {
        equipmentRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
