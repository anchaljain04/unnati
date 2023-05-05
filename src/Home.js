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
          backgroundImage: 'url("/images/background.jpg")',
          height: "100vh",
          width: "100%",
          paddingTop: "40px",
          textAlign: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 style={{ fontFamily: "Roboto Slab, serif", fontStyle: "italic", color: "white"}}>
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
                  fontStyle: "italic",
                }}
              >
                Welcome to UNNATI for the unnati of local workers and for people
                who need workers .
              </h2>
              <br />
              <h2 
                 style={{
                   fontSize: "30px",
                   fontStyle: "italic",
                }}>
                Here, we provide various services of and for local workers for
                our day to day services like maids, plumbers, carpenters,
                electricians, painters etc.
              </h2>
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
