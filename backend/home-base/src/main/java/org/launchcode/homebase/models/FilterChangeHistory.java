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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date changedTimeStamp;

    public FilterChangeHistory() {
    }
    public FilterChangeHistory(Long equipmentId, String equipmentName, Long filterId, Date sentTimestamp) {
        this.equipmentId = equipmentId;
        this.equipmentName = equipmentName;
        this.changedTimeStamp = sentTimestamp;
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

    public Date getChangedTimestamp() {
        return changedTimeStamp;
    }

    public void setChangedTimestamp(Date changedTimestamp) {
        this.changedTimeStamp = changedTimestamp;
    }
}
