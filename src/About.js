import React, { Component } from "react";
import NavBar from "./NavBar";
import UpdateAddressModal from "./UpdateAddressModal";

export default class About extends Component {
  render() {
    const userData = localStorage.getItem("Profile");
    const user = JSON.parse(userData);
    return (
      <div
        style={{
          textAlign: "center",
          backgroundImage: 'url("/images/bg4.png")',
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <NavBar />
        <div>
          <h2
            style={{
              marginTop: "50px",
              fontFamily: "Roboto Slab, serif",
              fontStyle: "italic",
              color: "white",
              textShadow: "1px 1px black",
            }}
          >
            Your Information:
          </h2>
          <div
            style={{
              display: "flex",
              width: "45%",
              margin: "auto",
              borderRadius: "10px",
              border: "1px solid var(--primary-color)",
              backgroundColor: "white",
              padding: "20px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              style={{
                flex: 0.4,
                textAlign: "left",
                padding: "5px",
              }}
            >
              <h5 style={{ marginBottom: "15px" }}>Name:</h5>
              <h5 style={{ marginBottom: "15px" }}>Email:</h5>
              <h5 style={{ marginBottom: "15px" }}>Mobile Number:</h5>
              <h5 style={{ marginBottom: "15px" }}>Address:</h5>
            </div>
            <div style={{ flex: 0.6, textAlign: "left", padding: "5px" }}>
              <h5
                style={{
                  fontWeight: "normal",
                  marginBottom: "15px",
                }}
              >
                {user.name}
              </h5>
              <h5
                style={{
                  fontWeight: "normal",
                  marginBottom: "15px",
                }}
              >
                {user.email}
              </h5>
              <h5
                style={{
                  fontWeight: "normal",
                  marginBottom: "15px",
                }}
              >
                {user.mobile}
              </h5>
              <h5
                style={{
                  fontWeight: "normal",
                  display: "flex",
                  marginBottom: "15px",
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
