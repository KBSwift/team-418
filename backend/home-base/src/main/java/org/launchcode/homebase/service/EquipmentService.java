package org.launchcode.homebase.service;

import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.Equipment;
import org.launchcode.homebase.models.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private FilterRepository filterRepository;

    //Build search string given filter id
    public String buildSearchString(int filterId) {
        Filter filter = filterRepository.findById(filterId)
                .orElseThrow(() -> new ResourceNotFoundException("Filter not found with id = " + filterId));

        String searchString = filter.getLength() + " x " + filter.getWidth() + " x " + filter.getHeight() + " filter";

        return searchString;
    }

    //Build arraylist of search strings for each filter given an equipment id
    public List<String> buildSearchStringsForEquipment(int equipmentId) {
        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found wih id = " + equipmentId));

        List<Filter> filters = equipment.getFilters();
        List<String> searchStrings = new ArrayList<>();

        for (Filter filter : filters) {
            String searchString = filter.getLength() + " x " + filter.getWidth() + " x " + filter.getHeight() + " filter";
            searchStrings.add(searchString);
        }
        return searchStrings;
    }

}
