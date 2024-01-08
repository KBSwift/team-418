package org.launchcode.homebase.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
public class FilterChangeHistory extends AbstractEntity{

    @Column(nullable = false)
    private Long equipmentId;
    @Column(nullable = false)
    private String equipmentName;
    @Column(nullable = false)
    private Long filterId;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date sentTimestamp;

    public FilterChangeHistory() {
    }
    public FilterChangeHistory(Long equipmentId, String equipmentName, Long filterId, Date sentTimestamp) {
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.filterId = filterId;
        this.sentTimestamp = sentTimestamp;
    }

    public Long getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public Long getFilterId() {
        return filterId;
    }

    public void setFilterId(Long filterId) {
        this.filterId = filterId;
    }

    public Date getSentTimestamp() {
        return sentTimestamp;
    }

    public void setSentTimestamp(Date sentTimestamp) {
        this.sentTimestamp = sentTimestamp;
    }
}
