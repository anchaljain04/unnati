import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (

      <div
        style={{
          background:"pink",
          height: "100vh",
          
        }}
      >
        <div style={{ 
          marginTop:"10px",
          marginLeft: "400px" ,
          marginRight:"500px",
          border:"solid",
          padding:"30px",
          justifyContent:"center",
          background:"#dfdbe4",
          
          }}>
          <h1
            style={{
              fontSize: "30px",
            }}
          >
            Welcome to UNNATI for the unnati of local workers and for people who
            need workers .
          </h1>
          <h3>Here, we provide various services of and for local workers for our day to day services like maids, plumbers, carpenters, electricians, painters etc.</h3>
          
          <Link
            to="/services"
            style={{
              fontFamily: "sans-serif",
              color: "black",
              fontSize: "30px",
            }}
          ><Button style={{background:"#9e3369" , justifyContent:"center" , alignItems:"center"}}>
            Explore Now{" "}
            </Button>
          </Link>
          
          
        </div>
      </div>
    );
  }
}
//backgroundImage: 'url("/images/back.jpg")',