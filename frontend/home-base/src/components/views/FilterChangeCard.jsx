import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/FilterChangeCardStyles.css';
import axios from 'axios';
import { Container, ListGroupItem } from 'react-bootstrap';


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
    
       
    

    
   
    
    // TO-DO Fix Due date to calculate lifespan+lastchanged?

    const renderDeck = () => {
      return (
        <div>
          <CardGroup>           
              {equipmentData.map((item) => (
                  <Card key={item.id} border="info" style={{ width: '18rem', borderRadius: '20px', padding: 0, backgroundColor: 'rgba(255, 255, 255, .1)'}}>
                      <Card.Body>
                          <Card.Title style={{ fontWeight: 'bold'}}>{item.name}</Card.Title>
                          <div>
                            {item.filters.map(filter => (
                              <ListGroup key={filter.id} className="list-group-flush">
                                  <ListGroup.Item style={{ fontWeight: 'bold', backgroundColor: 'rgba(0, 0, 255, .1)'}}>Location: {filter.location}</ListGroup.Item>
                                  <ListGroup.Item style={{backgroundColor: 'rgba(125, 125, 255, .1)'}}>Filter Size: {filter.length} x {filter.width} x {filter.height}</ListGroup.Item>
                                  <ListGroup.Item style={{backgroundColor: 'rgba(125, 125, 255, .1)'}}>Date of Last Change: {filter.dateOfLastChange}</ListGroup.Item>
                                  <ListGroup.Item style={{backgroundColor: 'rgba(125, 125, 255, .1)'}}>Due Date: {new Date(new Date(filter.dateOfLastChange).setDate(new Date(filter.dateOfLastChange).getDate() + item.filterLifeDays)).toISOString().split("T")[0]}
                                  </ListGroup.Item>
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
                          
      )
  }

    // const renderDeck = () => {
    //     return (
          
    //         <CardGroup>
              
    //             {equipmentData.map((item) => (
    //                 <Card key={item.id}>
    //                     <Card.Body>
    //                         <Card.Title>{item.name}</Card.Title>
    //                         {item.filters.map(filter => (
    //                             <ListGroup key={filter.id}>
    //                                 <Card.Subtitle>Location: {filter.location}</Card.Subtitle>
    //                                 <ListGroup.Item>Filter Size: {filter.length} x {filter.width} x {filter.height}</ListGroup.Item>
    //                                 <ListGroup.Item>Date of Last Change: {filter.dateOfLastChange}</ListGroup.Item>
    //                                 <ListGroup.Item>Due Date: {new Date(new Date(filter.dateOfLastChange).setDate(new Date(filter.dateOfLastChange).getDate() + item.filterLifeDays)).toISOString().split("T")[0]}
    //                                 </ListGroup.Item>
    //                             </ListGroup>
    //                         ))}
    //                         <Button onClick={() => handleClick(item.id)} variant="primary">Change Now</Button>
    //                     </Card.Body>
    //                 </Card>
    //             ))}
              
    //         </CardGroup>
          
    //     )
    // }
    

    return (
        renderDeck()
    );
}

export default FilterChangeCard