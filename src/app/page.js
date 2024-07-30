"use client";
import { useRouter } from 'next/navigation';
import CustomNavbar from '@/components/Navbar';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export default function Home() {
  const [formData, setFormData] = useState({
    companyUEN: '',
    companyName: '',
    fullName: '',
    position: '',
    email: '',
    confirmEmail: '',
    mobile: '',
    documents: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: Array.from(e.target.files),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyUEN) newErrors.companyUEN = 'Company UEN is required';
    if (!formData.companyName) newErrors.companyName = 'Company Name is required';
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.confirmEmail) newErrors.confirmEmail = 'Re-enter Email Address is required';
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Email addresses do not match';
    if (!formData.mobile) newErrors.mobile = 'Mobile Number is required';
    if (formData.documents.length === 0) newErrors.documents = 'At least one document must be uploaded';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const formDataToSubmit = {
        companyUEN: formData.companyUEN,
        companyName: formData.companyName,
        fullName: formData.fullName,
        position: formData.position,
        email: formData.email,
        mobile: formData.mobile,
        confirmEmail: formData.confirmEmail,
        documents: formData.documents.length > 0 ? formData.documents[0].name : null
      };

      const response = await fetch('https://sme-backend.onrender.com/users/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Redirect to the form data page
        router.push('/forms');
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during form submission', error);
      alert('An error occurred during form submission.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <CustomNavbar />
      <Container className="">
        <div className="shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className='rounded-full h-8 w-8 bg-gray-300 flex justify-center items-center mr-5'>1</div>
            <div className=" p-2 h-8 flex items-center w-full bg-gradient-custom py-4 text-black mr-4 text-white">Company Information</div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-4 mr-4">
              <Col className='ml-12'>
                <Form.Group controlId="companyUEN">
                  <Form.Label>Company UEN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your company UEN"
                    name="companyUEN"
                    value={formData.companyUEN}
                    onChange={handleChange}
                    isInvalid={!!errors.companyUEN}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyUEN}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your company name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    isInvalid={!!errors.companyName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="flex items-center mb-6">
              <div className='rounded-full h-8 w-8 bg-gray-300 flex justify-center items-center mr-5'>2</div>
              <div className=" p-2 h-8 flex items-center w-full bg-gradient-custom py-4 text-black mr-4 text-white">Applicant Information</div>
            </div>
            <Row className="mb-4">
              <Col className='ml-12'>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="position">
                  <Form.Label>Position within company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    isInvalid={!!errors.position}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.position}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className='ml-12'>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="confirmEmail">
                  <Form.Label>Re-enter Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Re-enter your email address"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmEmail}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className='ml-12'>
                <Form.Group controlId="mobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your mobile number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="flex items-center mb-6">
              <div className='rounded-full h-8 w-8 bg-gray-300 flex justify-center items-center mr-5'>3</div>
              <div className=" p-2 h-8 flex items-center w-full bg-gradient-custom py-4 text-black mr-4 text-white">Upload Documents</div>
            </div>
            <Row className=" rounded-lg p-8 mt-10">
              <Col md={5} className="ml-9 border border-dashed border-gray-400 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 rounded-lg w-full">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18m-7 4l4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="file-upload" 
                      multiple 
                      onChange={handleFileChange} 
                    />
                    <label htmlFor="file-upload" className="text-gray-600 text-center cursor-pointer">
                      <span className="text-blue-500">Click to upload</span> or drag and drop Bank Statements
                    </label>
                  </div>
                </div>
              </Col>
              <Col md={6} className="pl-6">
                <ul className="list-inside list-disc text-gray-600">
                  <li>PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.</li>
                  <li>Example: If today is 30 Jul 24, then please upload bank statements from Jan 24 to Jun 24 (both months inclusive).</li>
                  <li>If your company is multi-banked, then please upload 6 months bank statements for each bank account.</li>
                  <li>If your file is password protected, we request you to remove the password and upload the file to avoid submission failure.</li>
                  <li>In case you are facing any issue while uploading bank statements, Please contact us on <a href="mailto:support@credilinq.ai" className="text-blue-500">support@credilinq.ai</a>.</li>
                </ul>
              </Col>
            </Row>
            <div className="flex items-center mb-6">
              <div className='rounded-full h-8 w-8 bg-gray-300 flex justify-center items-center mr-5'>4</div>
              <div className=" p-2 h-8 flex items-center w-full bg-gradient-custom py-4 text-black mr-4 text-white">Terms and Conditions</div>
            </div>
            <Row className=" rounded-lg p-8 mt-10">
              <Col md={12} className="pl-6">
                <ul className="list-inside list-disc text-gray-600">
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check 
                      type="checkbox" 
                      label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:" 
                      required
                    />
                  </Form.Group>
                  <li>I confirm that I am the authorized person to upload bank statements on behalf of my company.</li>
                  <li>I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated.</li>
                  <li>I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth.</li>
                  <li>I have read and understand the Terms & Conditions.</li>
                </ul>
              </Col>
            </Row>
            <div className='ml-12'>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
