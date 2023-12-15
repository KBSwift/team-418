package org.launchcode.homebase.data;

import org.launchcode.homebase.models.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilterRepository extends JpaRepository<Filter, Integer> {
    List<Filter> findByEquipmentId(int equipmentId);
}
