import React from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("Profile");

  const userData = JSON.parse(user);
  const handleClick = (service) => {
    user
      ? userData.category === "customer"
        ? navigate(`/services/${service}`)
        : window.alert(
            "You need to register as a customer to see the available provider's details!"
          )
      : window.alert(
          "You need to login first to see the details of providers!"
        );
  };
  return (
    <div 
      style={{
      
    }}>
      <Navbar bg="dark" variant="dark">
        <Container 
          fluid>
          
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-4 ms-4 my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown
                title="Services"
                id="navbarScrollingDropdown"
                className="ms-2"
                bg="dark"
                href="/services"
              >
                <NavDropdown.Item onClick={() => handleClick("maid")}>
                  Maid
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("carpenter")}>
                  Carpenter{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("electrician")}>
                  Electrician{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("plumber")}>
                  Plumber
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("painter")}>
                  Painter
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("chef")}>
                  Chef
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Brand href="/" className="ms-auto me-5"
             style={{
              letterSpacing:"2.0rem",
            
             }}>
            UNNATI
          </Navbar.Brand>

            <Nav className="ms-auto me-2" style={{ maxHeight: "100px" }} navbarScroll>
              {user ? (
                <Nav.Link
                  as={Button}
                  to={"/"}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                    window.location.reload(true);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0",
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
            {user ? (
              <>
                <Nav style={{ maxHeight: "100px" }} navbarScroll>
                  <NavDropdown
                    title={
                      <p>{
                        userData.name.charAt(0)
                      }</p>
                      // <img
                      //   src="/images/account.png"
                      //   alt="account"
                      //   style={{ height: "40px", width: "40px" }}
                      // />
                    }
                    id="navbarScrollingDropdown"
                    className="ms-4"
                    bg="dark"
                    href="/services"
                    align="end"
                  >
                    <NavDropdown.Item onClick={() => navigate("/about")}>
                      Profile
                    </NavDropdown.Item>
                    {userData?.category === "customer" ? (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          onClick={() => navigate("/activities")}
                        >
                          Activities
                        </NavDropdown.Item>
                      </>
                    ) : (
                      ""
                    )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => navigate("/connection-requests")}
                    >
                      Connection Requests
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
      {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
            <Link to ="/" className="services">Services</Link>
          </li>
        </ul>
        <Link to ="/">
          <p className="navbar-brand"> UNNATI</p>
        </Link>
      </nav> */}
    </div>
  );
}
