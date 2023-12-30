package org.launchcode.homebase.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Equipment extends AbstractEntity {

    @NotBlank(message = "Name is required.")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @OneToMany(mappedBy = "equipment")
    private List<Filter> filters;

    @NotNull(message = "Filter life is required.")
    @Positive(message = "Filter life must be a positive number.")
    private int filterLifeDays;

    public Equipment(String name, List<Filter> filters, int filterLifeDays) {
        this.name = name;
        this.filters = filters;
        this.filterLifeDays = filterLifeDays;
    }

    public Equipment() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public int getFilterLifeDays() {
        return filterLifeDays;
    }

    public void setFilterLifeDays(int filterLifeDays) {
        this.filterLifeDays = filterLifeDays;
    }

    @Override
    public String toString() {
        return name;
    }
}
