import { useEffect, useState } from "react"
import { Button, Container, Table, Row, Col, AlertHeading } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";


function FilterChangeHistory() {

    const[filterChangeHistory, setFilterChangeHistory] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        loadHistory();
      }, []);

      const loadHistory = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/filter-history");
          console.log(response.data);
          setFilterChangeHistory(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };  

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/filter-history/email");
            console.log(response.data);
        } catch (error) {
            console.error("Failed to send emails: ", error);
        }
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
          }, 10000);
    };

    const renderAlert = () => {
        if(showAlert) {
            return (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>Emails Sent!</Alert.Heading>
                    <p>Thanks for using Home Base!</p>
                </Alert>
            );
        }
        return null;
    }

    const renderTable = () => {
        if(filterChangeHistory.length === 0) {
            return (
            <div>
                <Alert variant="info">
                    No data available.
                </Alert>
                <Container>
                <Row>
                    <Button onClick={handleClick}>Send Email Notifications</Button>
                </Row>    
                <Row>    
                    <h6>Checks for filters due and sends email</h6>
                </Row>
            </Container>
            </div>
                
                );
            }
            
            return (
        <div>
            <h2>Filter Change History</h2>
            <Container>
                <Row>
                    <Button onClick={handleClick}>Send Email Notifications</Button>
                </Row>    
                <Row>    
                    <h6>Checks for Filters Due and sends email</h6>
                </Row>
            </Container>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date of Change</th>
                    <th>Equipment</th>
                </tr>
            </thead>
            <tbody>
                {filterChangeHistory.map((historyItem, index) => (
                    <tr key={index}>
                        <td>{new Date(historyItem.changedTimeStamp).toLocaleDateString()}</td>
                        <td>{historyItem.equipmentName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        
        </div>
        
        );
    };

    return (
        <div>
            {renderAlert()}
            {renderTable()}
        </div>
    ) 
}

export default FilterChangeHistory