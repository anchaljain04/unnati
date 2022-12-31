import React from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar () {
  const navigate = useNavigate()
    const user = localStorage.getItem("Profile");
    const handleClick = (service) => {
      user
        ? navigate(`/services/${service}`)
        : window.alert(
            "You need to login first to see the details of providers!"
          )
    };
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
                  <NavDropdown.Item onClick={()=>handleClick("maid")}>Maid</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>handleClick("carpenter")}>
                    Carpenter{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>handleClick("electrician")}>
                    Electrician{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>handleClick("plumber")}>Plumber</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>handleClick("painter")}>Painter</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>handleClick("chef")}>Chef</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <Nav
                className="me-4 ms-4 my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {user ? (
                  <Nav.Link
                    as={Button}
                    to={"/"}
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload(false)
                    }}
                    style={{
                      background:'transparent',
                      border:'none',
                      padding:'0'
                    }}
                  >
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to={"/login"}>
                    Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}
