import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Services() {
  const navigate = useNavigate();
  let user = localStorage.getItem("Profile");
  const handleClick = (service) => {
    user
      ? navigate(`/services/${service}`)
      : window.alert(
          "You need to login first to see the details of providers!"
        )
  };
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "25px 100px",
          justifyContent: "center",
          background: "pink",
        }}
      >
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/maid.jpg"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Maid Services</Card.Title>
            <Card.Text>
              Want to make your home clean and hygienic. Let our reliable maids
              help you with your household works. Click below to contact them
              for cleaning , washing dishes etc
            </Card.Text>

            <Button variant="primary" onClick={(e) => handleClick("maid")}>
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/carpenter.png"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Carpenter Services</Card.Title>
            <Card.Text>
              Want anyone to construct, repair or install frameworks and
              structure for your home . Click below to contact our hardworking
              cooperative carpenters
            </Card.Text>
            <Button variant="primary" onClick={(e) => handleClick("carpenter")}>
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/electrician.jpeg"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Electrician Services</Card.Title>
            <Card.Text>
              Want to correct your lose wires . Click below to contact our
              electricians for all kinds of electrical work like
              fitting,rewiring, repairing, installing etc.
            </Card.Text>
            <Button
              variant="primary"
              onClick={(e) => handleClick("electrician")}
            >
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
        <br />
        <br />
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/plumber.jpeg"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Plumber Services</Card.Title>
            <Card.Text>
              Want to correct the leaks . Click below to contact our plumbers to
              install or repair pipes and fixtures carrying water, gas or any
              fluid.
            </Card.Text>
            <Button variant="primary" onClick={(e) => handleClick("plumber")}>
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/painter.jpeg"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Painter</Card.Title>
            <Card.Text>
              Want to fix your walls and make your place more lively filled with
              colors. Contact our painters to apply paints and other decorative
              finishes.
            </Card.Text>
            <Button variant="primary" onClick={(e) => handleClick("painter")}>
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "25px" }}>
          <Card.Img
            variant="top"
            src="/images/chef.jpeg"
            width="286px"
            height="200"
          />
          <Card.Body>
            <Card.Title>Chef</Card.Title>
            <Card.Text>
              Want to have mouth watering food. Contact our cooks and chefs to
              have healthy, nutritious and delicious meals.
            </Card.Text>

            <Button variant="primary" onClick={(e) => handleClick("chef")}>
              Explore{" "}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
