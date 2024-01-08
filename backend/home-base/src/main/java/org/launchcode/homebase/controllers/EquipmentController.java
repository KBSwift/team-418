package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @GetMapping("/custom-search/{filterSize}")
    public ResponseEntity<String> performCustomSearch(@PathVariable String filterSize) {
        String apiKey = "AIzaSyCZTdr48vEcU77Bsyg9qzHFnd8vUUxVeRY";
        String cx = "f14d504f6ac45450e";

        String query = "Filter " + filterSize;

        String apiUrl = "https://www.googleapis.com/customsearch/v1?q=" + query + "&key=" + apiKey + "&cx=" + cx;

        String resultLink = "https://example.com";

        return ResponseEntity.ok("Check out this filter! " + resultLink);
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
