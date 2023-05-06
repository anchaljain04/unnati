import React from "react";
import "./NavBar.css";
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
        zIndex: "5",
        position: "sticky",
        width: "100%",
        top: 0,
      }}
    >
      <Navbar style={{ background: "#54236d" }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-4 ms-4 my-2 my-lg-0"
              // style={{ maxHeight: "70px" }}
              navbarScroll
            >
              <NavDropdown
                title="Services"
                id="navbarScrollingDropdown"
                className="ms-2"
                // bg="dark"
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
            <Navbar.Brand
              href="/"
              className="ms-auto me-5"
              style={{
                letterSpacing: "2.0rem",
                color: "var(--secondary-color-light)",
              }}
            >
              <strong>UNNATI</strong>
            </Navbar.Brand>

            <Nav
              className="ms-auto me-2"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
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
                    color: "var(--secondary-color-light)",
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to={"/login"}
                  style={{ color: "var(--secondary-color-light)" }}
                >
                  Login
                </Nav.Link>
              )}
            </Nav>
            {user ? (
              <>
                <Nav style={{ maxHeight: "100px" }} navbarScroll>
                  <NavDropdown
                    title={
                      <span
                        style={{
                          height: "40px",
                          width: "40px",
                          background: "var(--primary-color)",
                          color: "var(--secondary-color-light)",
                          borderRadius: "50%",
                          fontSize: "18px",
                          padding: "4px 8px",
                        }}
                      >
                        {userData.name.charAt(0)}
                      </span>
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
