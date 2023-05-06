import React from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {Select , MenuItem} from "@mui/material";
import { useState } from "react";
import { MyContextState } from "./MyContext";


import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar2() {
  const navigate = useNavigate();
  const user = localStorage.getItem("Profile");
  const [radioValue, setRadioValue] = useState("1");
 // const{language , setLanguage}= MyContextState();
  const radios = [
    { name: "English", value: "1" },
    { name: "Hindi", value: "2" },
  ];

  const userData = JSON.parse(user);
  const handleClick = (service) => {
    user
      ? userData.category === "Profile"
        ? navigate(`/services/${service}`)
        : window.alert(
            "उपलब्ध प्रदाता के विवरण देखने के लिए आपको ग्राहक के रूप में पंजीकरण करना होगा!"
          )
      : window.alert(
          "प्रदाताओं का विवरण देखने के लिए आपको पहले लॉगिन करना होगा!"
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
                title="सेवा"
                id="navbarScrollingDropdown"
                className="ms-2"
                // bg="dark"
                href="/services"
              >
                <NavDropdown.Item onClick={() => handleClick("maid")}>
                नौकरानी
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("carpenter")}>
                  बढ़ई{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("electrician")}>
                बिजली मिस्त्री{" "}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("plumber")}>
                प्लंबर
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("painter")}>
                पेंटर
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleClick("chef")}>
                बावर्ची
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Brand
              className="ms-auto me-auto"
              style={{
                color: "var(--secondary-color-light)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <strong>उन्नति</strong>
            </Navbar.Brand>
           {/* <ButtonGroup className="ms-2 me-2">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>  */}
        <Select 
              variant="outlined"
              style={{
                width:100,
                height:40,
                marginRight:15,
              }} 
              // value={language}
              // onChange={(e) => setLanguage(e.target.value)}
              >
    
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Hindi"}>Hindi</MenuItem>
              </Select>
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
                  लॉग आउट
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to={"/login"}
                  style={{ color: "var(--secondary-color-light)" }}
                >
                  लॉग इन
                </Nav.Link>
              )}
            </Nav>
            {user ? (
              <>
                <Nav className="me-2" style={{ maxHeight: "100px" }} navbarScroll>
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
                    className="ms-4"
                    bg="dark"
                    align="end"
                  >
                    <NavDropdown.Item onClick={() => navigate("/about")}>
                    प्रोफ़ाइल
                    </NavDropdown.Item>
                    {userData?.category === "customer" ? (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          onClick={() => navigate("/activities")}
                        >
                          गतिविधियाँ
                        </NavDropdown.Item>
                      </>
                    ) : (
                      ""
                    )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => navigate("/connection-requests")}
                    >
                      कनेक्शन अनुरोध
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
