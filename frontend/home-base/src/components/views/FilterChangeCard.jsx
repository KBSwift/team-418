
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardGroup, ListGroup, Button} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import '../styles/FilterChangeCardStyles.css';
import axios from 'axios';



function FilterChangeCard(){

    const[equipmentData, setEquipmentData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[showAlert, setShowAlert] = useState(false);
    
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
  
  const handleGoogleSearch = async (equipmentId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/equipment/${equipmentId}/google-search-link`);
        window.open(response.data, '_blank');
    } catch (error) {
        console.error('Error triggering Google search:', error);
    }
  };

  const formatFilterSize = (filter) => {
    return `filter size ${filter.length} x ${filter.width} x ${filter.height}`;
  };

  const handleSerpApi = async (formatFilterSize) => {
    try {
      const response = await axios.get(`http://localhost:8080/search?filterSize=${formatFilterSize}`, { timeout: 5000 });
      console.log('SerpApi response:', response.data);
      window.open(response.data, '_blank');
    } catch (error) {
      console.error('Error calling Serpapi:', error.message);
    }
  };
  
    //Display message if data empty
    if (equipmentData.length === 0) {
      return<p>Please add filters to track.</p>;
    }

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
        filterLifeDays: selectedEquipment.filterLifeDays,
      };

      // Step 4: Log Filter change history
      const filterChangeHistory = {
        equipmentId: selectedEquipment.id,
        equipmentName: selectedEquipment.name,
        changedTimeStamp: new Date().toISOString().split("T")[0], 
      }
      await axios.post('http://localhost:8080/api/filter-history', filterChangeHistory, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
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

      // Display an alert, hides with time delay
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 10000);
    };

    const renderAlert = () => {
      if (showAlert) {
        return (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Filter Changed!</Alert.Heading>
            <p>All Filters for this Equipment have been successfully changed!</p>
          </Alert>
        );
      }
      return null;
    };
 
    const renderDeck = () => {
      return (
        <div>
          <CardGroup className="custom-card-group">
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
                        <ListGroup.Item className="custom-listgroup-item">Date of Last Change: {new Date(filter.dateOfLastChange).toLocaleDateString('en-US').replace(/\//g, '-')}</ListGroup.Item>
                        <ListGroup.Item className="custom-listgroup-item">Due Date: {new Date(new Date(filter.dateOfLastChange).setDate(new Date(filter.dateOfLastChange).getDate() + item.filterLifeDays)).toLocaleDateString('en-US').replace(/\//g, '-')}</ListGroup.Item>
                        </div>                        
                      </ListGroup>
                    ))}
                  </div>
                  <div className='button-container text-center'>
                  <div className="button-wrapper">
                    <Button onClick={() => handleClick(item.id)} variant="success">Change Now</Button>
                  </div>
                  <div className="button-wrapper">
                    <Button onClick={() => handleGoogleSearch(item.id)} variant="primary">Find This Filter</Button>
                  </div>
                  <div className="button-wrapper">
                    <Button onClick={() => handleSerpApi(formatFilterSize(item.filters[0]))} variant="info">Test API!</Button>
                  </div>
                </div>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </div>
      );
    };

    return (
      <div>
        {renderAlert()}
        {renderDeck()}
      </div>
    );
}

export default FilterChangeCard