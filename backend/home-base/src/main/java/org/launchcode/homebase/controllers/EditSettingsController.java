package org.launchcode.homebase.controllers;

import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.models.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/edit")
public class EditSettingsController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private FilterRepository filterRepository;

//TODO: ADD UserRepository to Edit Controller
//    @Autowired
//    private UserRepository userRepository;

    //Get all equipment
    @GetMapping("/equipment")
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    //Create equipment rest api
    @PostMapping("/equipment")
    public Equipment createEquipment(@RequestBody Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

}
