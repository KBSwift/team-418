import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CardGroup } from 'react-bootstrap';
import axios from 'axios';


function FilterChangeCard({userId}){

    // Load Data, putting data into empty array.

    const[equipmentData, setEquipmentData] = useState();
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    // the http request needs to fetch both equipment and filter data. Perhaps create custom query in back end to retrieve info based on user logged in. Example: `http://localhost:8080/api/user/${userId}/equipment-and-filters`

    useEffect(() => {
        axios.get('http://localhost:8080/api/equipment/1')
            .then(response => {
                console.log(response.data);
                setEquipmentData([response.data]);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }, [userId]); // userId in dependency array for useEffect hook
        
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }

    //TO-DO Test data pull and data structure

    // renderDeck function will map over data array
    // TO-DO Needs testing for data load 
    // TO-DO Import Card into app.jsx(or relevant file) & configure routing
    // TO-DO Have butt

    const renderDeck = () => {
        return equipmentData.map(item => (    
          <Card key={item.id} style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src={item.imageUrl} alt={item.name} /> */}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
      
              {item.filters.map(filter => (
                <div key={filter.id}>
                  <Card.Subtitle>Location: {filter.location}</Card.Subtitle>
                  <Card.Text>Filter Size: {filter.length} x {filter.width} x {filter.height}</Card.Text>
                  <Card.Text>Date of Last Change: {filter.dateOfLastChange}</Card.Text>
                </div>
              ))}
      
              <Card.Text>Due Date: {item.filterLifeDays}</Card.Text>
              <Button variant="primary">Change Now</Button>
            </Card.Body>
          </Card> 
        ));  
      };

    return (
        <CardGroup>
            {renderDeck()}
        </CardGroup>
    );
}

export default FilterChangeCard