import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {

  const handleLogout=()=>{
    localStorage.removeItem('userToken');
    toast.success('user logout successfully') 
  }
  return (
    <div className='header'>
        <Navbar expand="lg" className="bg-danger" style={{height:"100px"}}>
      <Container>
        <Navbar.Brand as={Link} className='text-warning' to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} className='text-warning' to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} className='text-warning' to="/users">Users</Nav.Link>
            <Nav.Link as={Link} className='text-warning' to="/vehicles">Vehicles</Nav.Link>

            <NavDropdown title="Admin" className='text-warning' id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} className='text-warning' to="/"
              onClick={handleLogout}>Logout
              </NavDropdown.Item>
             
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header