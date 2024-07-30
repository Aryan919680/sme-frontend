"use client";
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 

const FormDataDisplay = ({ formData }) => {
  const router = useRouter(); 

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Form Data</Card.Title>
              <div className="space-y-4">
                <div>
                  <strong>Company UEN:</strong> {formData.companyUEN}
                </div>
                <div>
                  <strong>Company Name:</strong> {formData.companyName}
                </div>
                <div>
                  <strong>Full Name:</strong> {formData.fullName}
                </div>
                <div>
                  <strong>Position:</strong> {formData.position}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                <div>
                  <strong>Mobile:</strong> {formData.mobile}
                </div>
                <div>
                  <strong>Confirm Email:</strong> {formData.confirmEmail}
                </div>
                <div>
                  <strong>Document:</strong> {formData.documents}
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button onClick={handleBackToHome} variant="primary">
                  Back to Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormDataDisplay;
