import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CardGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';


function FilterChangeCard({userId}){

    // Load Data, putting data into empty array.

    const[equipmentData, setEquipmentData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    // the http request needs to fetch both equipment and filter data. Perhaps create custom query in back end to retrieve info based on user logged in. Example: `http://localhost:8080/api/user/${userId}/equipment-and-filters`
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
      const selectedEquipment = equipmentData.find(equipment => equipment.id === equipmentId);
    
      const updatedData = {
        id: selectedEquipment.id,
        name: selectedEquipment.name,
        filters: selectedEquipment.filters.map(filter => ({
          id: filter.id,
          location: filter.location,
          length: filter.length,
          width: filter.width,
          height: filter.height,
          dateOfLastChange: new Date().toISOString().split("T")[0],
        })),
        filterLifeDays: 60,
      };
    
      await handleUpdate(equipmentId, updatedData);
    
      // Instead of using setEquipmentData, fetch the updated data
      await loadEquipment();
    };
       
    //TO-DO Test data pull and data structure

    // renderDeck function will map over data array
    // TO-DO Needs testing for data load 
    // TO-DO Import Card into app.jsx(or relevant file) & configure routing
    // TO-DO Have butt


    const renderDeck = () => {
        return (
            <CardGroup>
                {equipmentData.map((item) => (
                    <Card key={item.id} style={{ width: '18rem'}}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            {item.filters.map(filter => (
                                <ListGroup key={filter.id}>
                                    <Card.Subtitle>Location: {filter.location}</Card.Subtitle>
                                    <Card.Text>Filter Size: {filter.length} x {filter.width} x {filter.height}</Card.Text>
                                    <Card.Text>Date of Last Change: {filter.dateOfLastChange}</Card.Text>
                                </ListGroup>
                            ))}
                            <Card.Text>Due Date: {item.filterLifeDays}</Card.Text>
                            <Button onClick={() => handleClick(item.id, item.filters)} variant="primary">Change Now</Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
        )
    }
    

    return (
        renderDeck()
    );
}

export default FilterChangeCard