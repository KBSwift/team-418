package org.launchcode.homebase.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;

@Entity
public class Filter extends AbstractEntity{

    @NotBlank(message = "Location is required.")
    @Size(min = 2, max = 75, message = "Location must be between 2 and 75 characters.")
    private String location;

    @NotNull(message = "Filter length is required.")
    @Positive(message = "Filter length must be a positive number.")
    private int length;

    @NotNull(message = "Filter width is required.")
    @Positive(message = "Filter width must be a positive number.")
    private int width;

    @NotNull(message = "Filter height is required.")
    @Positive(message = "Filter height must be a positive number.")
    private double height;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "equipment_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Equipment equipment;

    @Past
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfLastChange;

    public Filter(String location, int length, int width, int height, Equipment equipment, Date dateOfLastChange) {
        this.location = location;
        this.length = length;
        this.width = width;
        this.height = height;
        this.equipment = equipment;
        this.dateOfLastChange = dateOfLastChange;
    }

    public Filter() {
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public Date getDateOfLastChange() {
        return dateOfLastChange;
    }

    public void setDateOfLastChange(Date dateOfLastChange) {
        this.dateOfLastChange = dateOfLastChange;
    }

    @Override
    public String toString() {
        return "Filter size " +
                length + " x " +
                width + " x " +
                height +
                " for " + equipment.getName() +
                ".";
    }
}
