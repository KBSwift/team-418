package org.launchcode.homebase.service;

import org.launchcode.homebase.data.EmailNotificationRepository;
import org.launchcode.homebase.data.EquipmentRepository;
import org.launchcode.homebase.data.FilterRepository;
import org.launchcode.homebase.exception.ResourceNotFoundException;
import org.launchcode.homebase.models.EmailNotification;
import org.launchcode.homebase.models.Equipment;
import org.launchcode.homebase.models.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailService {

   @Autowired
    private EmailNotificationRepository emailNotificationRepository;

   @Autowired
   private EquipmentRepository equipmentRepository;

   @Autowired
   private FilterRepository filterRepository;

   public void sendEmail(int equipmentId, int filterId, String to, String subject, String message) throws Exception {
       //Code for sendEmail

    logEmailNotification(equipmentId, filterId, to, subject, message);
   }

   private void logEmailNotification(int equipmentId, int filterId, String to, String subject, String message) {

       Equipment equipment = equipmentRepository.findById(equipmentId)
               .orElseThrow(() -> new ResourceNotFoundException("Equipment not found with id = " + equipmentId));

       Filter filter = filterRepository.findById(filterId)
               .orElseThrow(() -> new ResourceNotFoundException("Filter not found with id = " + filterId));

       EmailNotification emailNotification = new EmailNotification();
       emailNotification.setRecipientEmail(to);
       emailNotification.setEquipmentId(equipmentId);
       emailNotification.setEquipmentName(equipment.getName());
       emailNotification.setFilterId(filterId);
       emailNotification.setSentTimestamp(new Date());

       emailNotificationRepository.save(emailNotification);

   }

}
