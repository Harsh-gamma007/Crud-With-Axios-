import * as React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink className="nav-brand" to="/">
            <h1>User Details</h1>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-Link" to="/addUser">
                Create User
              </NavLink>
              <NavLink className="nav-Link" to="/">
                See Users-List
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}
export default Header
