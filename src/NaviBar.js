import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class NaviBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/" className="ms-2">
              Unnati
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto ms-4 my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <NavDropdown
                  title="Services"
                  id="navbarScrollingDropdown"
                  className="ms-4 "
                  bg="dark"
                  href="/services"
                >
                  <NavDropdown.Item href="/maid">Maid</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/Carpenter">
                    Carpenter{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/electrician">
                    Electrician{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/plumber">Plumber</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/painter">Painter</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/chef">Chef</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav
                className="me-4 ms-4 my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
