import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import NaviBar from "./NaviBar";
import { Link } from "react-router-dom";

export default class Services extends Component {
  render() {
    return (
      <div>
        <NaviBar />
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
                Want to make your home clean and hygienic. Let our reliable
                maids help you with your household works. Click below to contact
                them for cleaning , washing dishes etc
              </Card.Text>
              
              <Link to="/maid"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}><Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
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
                structure for your home . Click below to contact our harkworking
                cooperative carpenters
              </Card.Text>
              
              <Link to="/carpenter"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}><Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
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
              
              <Link to="/electrician"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}>
            <Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
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
                Want to correct the leaks . Click below to contact our plumbers
                to install or repair pipes and fixtures carrying water, gas or
                any fluid.
              </Card.Text>
              
              <Link to="/plumber"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}>
                <Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
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
                Want to fix your walls and make your place more lively filled
                with colors. Contact our painters to apply paints and other
                decorative finishes.
              </Card.Text>
              
              <Link to="/painter"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}>
                <Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
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
          
              <Link to="/chef"
              style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "20px",
            }}>
                <Button variant="primary">
                Explore{" "}
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
