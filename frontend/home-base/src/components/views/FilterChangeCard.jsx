import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/FilterChangeCardStyles.css';
import axios from 'axios';



function FilterChangeCard(){

    const[equipmentData, setEquipmentData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    useEffect(() => {
      loadEquipment();
    }, []);
  
    const loadEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/equipment");
        console.log(response.data);
        setEquipmentData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const handleUpdate = async (equipmentId, updatedData) => {
      try {
        await axios.put(`http://localhost:8080/api/equipment/${equipmentId}`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error updating equipment:', error);
      }
    };
 
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }
    
    const handleClick = async (equipmentId) => {
      const selectedEquipment = equipmentData.find((equipment) => equipment.id === equipmentId);
      const filterLocations = [];
      const newFilterArray = [];
    
      // Step 1: Delete all existing filters
      for (const filter of selectedEquipment.filters) {
        filterLocations.push(filter.location);
        await axios.delete(`http://localhost:8080/api/filters/${filter.id}`);
      }
    
      // Step 2: Create new filters with updated dimensions and dateOfLastChange
      for (const location of filterLocations) {
        const newFilter = {
          location: location,
          length: selectedEquipment.filters[0].length,  // Assuming all filters have the same dimensions
          width: selectedEquipment.filters[0].width,
          height: selectedEquipment.filters[0].height,
          dateOfLastChange: new Date().toISOString().split("T")[0],
        };
        newFilterArray.push(newFilter);
      }
    
      // Step 3: Update equipment data
      const updatedData = {
        id: selectedEquipment.id,
        name: selectedEquipment.name,
        filters: newFilterArray,
        filterLifeDays: 60,
      };
    
      // Post new filters
      for (const filter of newFilterArray) {
        await axios.post(`http://localhost:8080/api/equipment/${equipmentId}/filters`, filter, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    
      // Update equipment data
      await handleUpdate(equipmentId, updatedData);
    
      // Fetch the updated data
      await loadEquipment();
    };
 
    const renderDeck = () => {
      return (
        <div>
          <CardGroup>
            {equipmentData.map((item) => (
              <Card key={item.id} className = "custom-card">
                <Card.Body>
                  <Card.Title className = "custom-card-title">{item.name}</Card.Title>
                  <div>
                    {item.filters.map(filter => (
                      <ListGroup key={filter.id} className="list-group-flush">
                        <div>
                          <ListGroup.Item className="custom-card-subtitle">Location: {filter.location}</ListGroup.Item>
                        </div>
                        
                        <div>
                          <ListGroup.Item className="custom-listgroup-item">Filter Size: {filter.length} x {filter.width} x {filter.height}</ListGroup.Item>
                        <ListGroup.Item className="custom-listgroup-item">Date of Last Change: {filter.dateOfLastChange}</ListGroup.Item>
                        <ListGroup.Item className="custom-listgroup-item">Due Date: {new Date(new Date(filter.dateOfLastChange).setDate(new Date(filter.dateOfLastChange).getDate() + item.filterLifeDays)).toISOString().split("T")[0]}</ListGroup.Item>
                        </div>
                        
                      </ListGroup>
                    ))}
                  </div>
                  <div className='text-center'>
                    <Button onClick={() => handleClick(item.id)} variant="success">Change Now</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </div>
      );
    };


    return (
        renderDeck()
    );
}

export default FilterChangeCard