import * as React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="mt-4">
          <Nav className="nav-brand mr-4">
            <h1>User Details</h1>
          </Nav>
          <br />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-Link">
                <Link to="/addUser">Create User</Link>
              </Nav.Link>
              <Nav.Link className="nav-Link">
                <Link to="/">User List</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}
export default Header
