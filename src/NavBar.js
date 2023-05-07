import React, { useContext } from "react";
import "./NavBar.css";

import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "./context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("Profile");
  const myContext = useContext(AppContext);

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

  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
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
                title={data?.services}
                id="navbarScrollingDropdown"
                className="ms-2"
                href="/services"
              >
                <NavDropdown.Item onClick={() => handleClick("maid")}>
                  {data?.maidService}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("carpenter")}>
                  {data?.carpenterService}{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("electrician")}>
                  {data?.electricianService}{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("plumber")}>
                  {data?.plumberService}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("painter")}>
                  {data?.painterService}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("chef")}>
                  {data?.chefService}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Brand
              className="ms-auto me-auto"
              style={{
                letterSpacing: "2.0rem",
                color: "var(--secondary-color-light)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <strong>{data?.navTitle}</strong>
            </Navbar.Brand>
            {window.location.pathname === "/" ? (
              <div>
                <button className="me-2" style={{background:"#9e3369" , color:"var(--secondary-color-light)" , padding:"2px 10px" , borderRadius:"5px" }} onClick={myContext.changeLanguage}>
                  {myContext.isHindi ? "English" : "हिन्दी"}
                </button>
              </div>
            ) : (
              ""
            )}
            <Nav
              className="ms-2 me-2"
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
                  {data?.logout}
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
                <Nav  navbarScroll>
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
                        {userData.name.charAt(0).toUpperCase()}
                      </span>
                    }
                    id="navbarScrollingDropdown"
                    className="ms-2"
                    bg="dark"
                    align="end"
                  >
                  
                    <NavDropdown.Item   onClick={() => navigate("/about")}>
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
    </div>
  );
}
