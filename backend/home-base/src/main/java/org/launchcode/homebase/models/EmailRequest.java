package org.launchcode.homebase.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;


public class EmailRequest extends AbstractEntity{

    @Column(nullable = false)
    private int equipmentId;
    @Column(nullable = false)
    private int filterId;
    @Column(nullable = false)
    private String to;
    @Column(nullable = false)
    private String subject;
    @Column(nullable = false)
    private String message;

    public EmailRequest(int equipmentId, int filterId, String to, String subject, String message) {
        this.equipmentId = equipmentId;
        this.filterId = filterId;
        this.to = to;
        this.subject = subject;
        this.message = message;
    }

    public int getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(int equipmentId) {
        this.equipmentId = equipmentId;
    }

    public int getFilterId() {
        return filterId;
    }

    public void setFilterId(int filterId) {
        this.filterId = filterId;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
