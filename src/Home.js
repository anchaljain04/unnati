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
          backgroundImage: 'url("/images/bg4.png")',
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
        <h1
          style={{
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
            backgroundColor: "black",
            color: "white",
            marginLeft: "420px",
            marginRight: "420px",
          }}
        >
          UNNATI - THE SERVICE PROVIDER
        </h1>
        <br />
        <div
          style={{
            width: "600px",
            margin: "auto",
            border: "solid",
            padding: "20px",
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
                  fontSize: "35px",
                  fontStyle: "italic",
                  fontFamily: " 'Montserrat'  sans-serif",
                }}
              >
                Welcome to UNNATI for the unnati of local workers and for people
                who need workers . Here, we provide various services of and for
                local workers for our day to day services like maids, plumbers,
                carpenters, electricians, painters etc.
              </h2>

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
                    background:
                      "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
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
