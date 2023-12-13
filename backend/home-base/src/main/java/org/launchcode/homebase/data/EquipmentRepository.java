package org.launchcode.homebase.data;

import org.launchcode.homebase.models.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {

    List<Equipment> findByName(String name);
}
