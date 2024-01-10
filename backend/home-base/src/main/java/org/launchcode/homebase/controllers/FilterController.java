package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.Filter;
import org.launchcode.homebase.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5175/")
@RequestMapping("/api")
public class FilterController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private FilterRepository filterRepository;

    @Autowired
    private EquipmentService equipmentService;

    @GetMapping("/equipment/{equipmentId}/filters")
    public ResponseEntity<List<Filter>> getAllFiltersByEquipmentId(@PathVariable(value = "equipmentId") int equipmentId) {
        if (!equipmentRepository.existsById(equipmentId)) {
            throw new ResourceNotFoundException("Not found Equipment with id = " + equipmentId);
        }

        List<Filter> filters = filterRepository.findByEquipmentId(equipmentId);
        return new ResponseEntity<>(filters, HttpStatus.OK);
    }

    @GetMapping("/filters/{id}")
    public ResponseEntity<Filter> getFiltersByEquipmentId(@PathVariable(value = "id") int id) {
        Filter filter = filterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Filter with id = " + id));

        return new ResponseEntity<>(filter, HttpStatus.OK);
    }

    @PostMapping("/equipment/{equipmentId}/filters")
    public ResponseEntity<Filter> createFilter(@PathVariable(value = "equipmentId") int equipmentId, @RequestBody Filter newFilter) {
        Filter filter = equipmentRepository.findById(equipmentId).map(equipment -> {
            newFilter.setEquipment(equipment);
            return filterRepository.save(newFilter);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Equipment with id = " + equipmentId));

        return new ResponseEntity<>(filter, HttpStatus.CREATED);
    }

    @PutMapping("/filters/{id}")
    public ResponseEntity<Filter> updateFilter(@PathVariable("id") int id, @RequestBody Filter _filter) {
        Filter filter = filterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Filter Id " + id + " not found"));

        filter.setLocation(_filter.getLocation());
        filter.setLength(_filter.getLength());
        filter.setWidth(_filter.getWidth());
        filter.setHeight(_filter.getHeight());
        filter.setDateOfLastChange(_filter.getDateOfLastChange());

        return new ResponseEntity<>(filterRepository.save(filter), HttpStatus.OK);
    }

    @RequestMapping(value = "/filters/{id}", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/filters/{id}")
    public ResponseEntity<HttpStatus> deleteFilter(@PathVariable("id") int id) {
        filterRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Generate search string by filter id
    @GetMapping("/filters/{id}/search")
    public ResponseEntity<String> getSearchStringForFilter(@PathVariable("id") int id) {
        String searchString = equipmentService.buildSearchString(id);
        return ResponseEntity.ok(searchString);
    }

    //Generate arraylist of search strings for each filter by equipment id
    @GetMapping("/equipment/{equipmentId}/filters/search")
    public ResponseEntity<List<String>> getSearchStringsForEquipment(@PathVariable("equipmentId") int equipmentId) {
        List<String> searchStrings = equipmentService.buildSearchStringsForEquipment(equipmentId);
        return ResponseEntity.ok(searchStrings);
    }
}