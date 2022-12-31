import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Home extends Component {
  render() {
    const user = localStorage.getItem("Profile");
    // console.log(JSON.parse(user).category)
    return (
      <div
        style={{
          background: "pink",
          height: "92vh",
          paddingTop: "50px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "Roboto Slab, serif", fontStyle: "italic" }}>
          UNNATI - THE SERVICE PROVIDER
        </h1>
        <br />
        <div
          style={{
            width: "600px",
            margin: "auto",
            border: "solid",
            padding: "30px",
            textAlign: "center",
            background: "#dfdbe4",
          }}
        >
          {JSON.parse(user)?.category === "provider" ? (
            <>
              <h2>See the requirements of our customers</h2>
              <Link
                to="/requirements"
                style={{
                  fontFamily: "sans-serif",
                  color: "black",
                  fontSize: "30px",
                }}
              >
                <Button
                  style={{
                    background: "#9e3369",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                  }}
                >
                  Explore Now{" "}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontSize: "30px",
                }}
              >
                Welcome to UNNATI for the unnati of local workers and for people
                who need workers .
              </h2>
              <br />
              <h3>
                Here, we provide various services of and for local workers for
                our day to day services like maids, plumbers, carpenters,
                electricians, painters etc.
              </h3>
              <br />
              <Link
                to="/services"
                style={{
                  fontFamily: "sans-serif",
                  color: "black",
                  fontSize: "30px",
                }}
              >
                <Button
                  style={{
                    background: "#9e3369",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                  }}
                >
                  Explore Now{" "}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
}
//backgroundImage: 'url("/images/back.jpg")',
