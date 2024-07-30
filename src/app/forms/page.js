"use client";
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card, Button } from 'react-bootstrap';
import CustomNavbar from '../../components/Navbar';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function FormDataPage() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/users'); // Adjust this if the API endpoint is different
        if (!response.ok) throw new Error('Failed to fetch form data');
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackToHome = () => {
    router.push('/'); // Navigate back to the home page
  };

  if (loading) return (
    <Container className="my-5 text-center">
      <Spinner animation="border" />
      <p>Loading...</p>
    </Container>
  );
  
  if (error) return (
    <Container className="my-5 text-center">
      <Alert variant="danger">Error: {error}</Alert>
    </Container>
  );

  return (
    <div>
      <CustomNavbar />
      <Container className="my-5">
        {formData.length === 0 ? (
          <Alert variant="info">No data available</Alert>
        ) : (
          formData.map((item) => (
            <Card key={item.id} className="mb-4">
              <Card.Header as="h5">Form Data</Card.Header>
              <Card.Body>
                <Card.Title>{item.companyName}</Card.Title>
                <Card.Text>
                  <strong>Company UEN:</strong> {item.companyUEN} <br />
                  <strong>Full Name:</strong> {item.fullName} <br />
                  <strong>Position:</strong> {item.position} <br />
                  <strong>Email:</strong> {item.email} <br />
                  <strong>Mobile:</strong> {item.mobile} <br />
                  <strong>Documents:</strong> {item.documents}
                </Card.Text>
                <div className="text-center">
                  <Button onClick={handleBackToHome} variant="primary">
                    Back to Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
