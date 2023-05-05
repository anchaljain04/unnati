import React, { Component } from "react";
import NavBar from "./NavBar";
import UpdateAddressModal from "./UpdateAddressModal";

export default class About extends Component {
  render() {
    const userData = localStorage.getItem("Profile");
    const user = JSON.parse(userData);
    return (
      <div style={{ textAlign: "center", backgroundImage: 'url("/images/background.jpg")', height: "100vh" }}>
        <NavBar />
        <div>
          <div
            style={{
              display: "flex",
              width: "50%",
              margin: "auto",
              marginTop: "90px",
              borderRadius: "5px",
              backgroundColor: "#f2f2f2",
              padding: "20px",
            }}
          >
            <div
              style={{
                flex: 0.4,
                textAlign: "left",
                padding: "5px",
              }}
            >
              <h4>Name:</h4>
              <br />
              <h4>Email:</h4>
              <br />
              <h4>Mobile Number:</h4>
              <br />
              <h4>Address:</h4>
            </div>
            <div style={{ flex: 0.6, textAlign: "left", padding: "5px" }}>
              <h5 style={{ fontWeight: "normal", marginTop: "5px" }}>
                {user.name}
              </h5>
              <br />
              <h5 style={{ fontWeight: "normal", marginTop: "5px" }}>
                {user.email}
              </h5>
              <br />
              <h5 style={{ fontWeight: "normal", marginTop: "5px" }}>
                {user.mobile}
              </h5>
              <br />
              <h5
                style={{
                  fontWeight: "normal",
                  marginTop: "5px",
                  display: "flex",
                }}
              >
                {user.address}
                <UpdateAddressModal />
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
