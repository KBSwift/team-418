import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CardGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios';


function FilterChangeCard(){

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
    //Change to delete
    // const handleFilterUpdate = async (filterId, updatedFilter) => {
    //   try {
    //     await axios.put(`http://localhost:8080/api/filters/${filterId}`, updatedFilter, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //   } catch (error) {
    //     setError(error);
    //   }
    // }

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
                             {/* Due date should equal filterlifedays + date of last change */}
                             {/* Research Calender Class in Java */}
                            <Card.Text>Due Date: {item.filterLifeDays}</Card.Text>
                            <Button onClick={() => handleClick(item.id)} variant="primary">Change Now</Button>
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