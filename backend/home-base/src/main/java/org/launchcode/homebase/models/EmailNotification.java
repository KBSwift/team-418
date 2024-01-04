package org.launchcode.homebase.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
public class EmailNotification extends AbstractEntity {

    @Column(nullable = false)
    private String recipientEmail;

    @Column(nullable = false)
    private int equipmentId;

    @Column(nullable = false)
    private String equipmentName;

    @Column(nullable = false)
    private int filterId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date sentTimestamp;

    public EmailNotification() {
    }

    public EmailNotification(String recipientEmail, int equipmentId, String equipmentName, int filterId, Date sentTimestamp) {
        this.recipientEmail = recipientEmail;
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.filterId = filterId;
        this.sentTimestamp = sentTimestamp;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public int getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(int equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public int getFilterId() {
        return filterId;
    }

    public void setFilterId(int filterId) {
        this.filterId = filterId;
    }

    public Date getSentTimestamp() {
        return sentTimestamp;
    }

    public void setSentTimestamp(Date sentTimestamp) {
        this.sentTimestamp = sentTimestamp;
    }
}
