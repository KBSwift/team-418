import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function FilterChangeCard({userId}){

    // Load Data, putting data into empty array.

    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    // the http request needs to fetch both equipment and filter data. Perhaps create custom query in back end to retrieve info based on user logged in. Example: `http://localhost:8080/api/user/${userId}/equipment-and-filters`

    useEffect(() => {
        axios.get(insert api endpoint)
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error =>{
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

    // Extract info from data response.
    //TO-DO Test data pull and data structure


    // Saving this portion in case mapping over the data array doesn't work
    // const equipmentName = data.equipment.name;
    // const filterLocation = data.location;
    // const filterSize = '${data.length} x ${data.width} x ${data.height}';
    // const dueDate = data.equipment.filterLifeDays;


    // renderDeck function will map over data array
    // TO-DO Needs testing for data load 
    // TO-DO Import Card into app.jsx & configure routing
    const renderDeck = () => {
      return data.map(item => (    
        <div key={item.id} className="card" style={{width: '18rem'}}>
            <img></img>
            <div className="card-body">
                <h5 className="card-title">{item.equipment.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.location}</h6>
                <p className="card-text">Filter Size: {item.length} x {item.width} x {item.height}</p>
                <p className="card-text">Due Date: {item.equipment.filterLifeDays}</p>
                <button type="button" class="btn">Change Now</button>
            </div>
        </div> 
        ));  
    };

    return (
        <div className="card-deck">
            {renderDeck()}
        </div>
    );
    

}

export default FilterChangeCard