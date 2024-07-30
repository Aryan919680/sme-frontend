"use client"
import Image from 'next/image';
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function CustomNavbar() {
  return (
    <Navbar className="bg-gradient-custom py-4">
      <Container>
        <Navbar.Brand href="#">
        <Image src='/logo.svg' width={150} height={150}/>
        </Navbar.Brand>
        <Navbar.Text className="ml-auto text-3xl text-white font-semibold">
          SME HealthCheck - Get Started
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
