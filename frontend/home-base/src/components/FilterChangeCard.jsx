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
        axios.get('http://localhost:8080/api/equipment')
            .then(response => {
                setEquipmentData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        axios.get('http://localhost:8080/api/equipment/${equipmentId}/filters')

    }, [userId]); // userId in dependency array for useEffect hook
        
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }

    const handleClick = async (equipmentId, filters) => {
        try {
          //Find correct equipment
          const selectedEquipment = equipmentData.find(equipment => equipment.id === equipmentId);
          //update equipment variable
          //TO DO Fix filterLifeDays updated value
          const updatedData = {
            id: selectedEquipment.id,
            name: selectedEquipment.name,
            filters: [],
            filterLifeDays: 80,
          };
          //Update Filter data, includes Put Request
          const updatedFilters = filters.map(async (filter) => {
            const response = await axios.put(
              `http://localhost:8080/api/filters/${filter.id}`,
              {
                id: filter.id,
                location: filter.location,
                length: filter.length,
                width: filter.width,
                height: filter.height,
                dateOfLastChange: new Date().toLocaleDateString('en-US'), 
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            return response.data;
          });


      //Equipment Put Request  
            await axios.put(`http://localhost:8080/api/equipment/${equipmentId}`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        setEquipmentData(prevData => {
          return prevData.map(equipment => {
            if (equipment.id === equipmentId) {
              return {
                ...equipment,
                filterLifeDays: 70,
                filters: updatedFilters.map(filter => ({
                location: filter.location,
                length: filter.length,
                width: filter.width,
                height: filter.height,
                dateOfLastChange: new Date().toLocaleDateString('en-US'),
                })),
              };
            }
            return equipment;
          });
        });

        } catch (error) {
          console.error('Error updating equipment data:', error);
        }
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