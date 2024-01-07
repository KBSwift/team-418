package org.launchcode.homebase.service;

import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.models.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterService {

    @Autowired
    private FilterRepository filterRepository;

    public List<Filter> getFiltersToChangeInNext7Days() {
        List<Filter> allFilters = filterRepository.findAll();
        return Filter.getFiltersToChangeInNext7Days(allFilters);
    }
}
