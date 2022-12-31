import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";

function Requirements() {
  const [requirements, setRequirements] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/get-requirements`)
      .then((response) => {
        setRequirements(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center", background: "pink", height: "100vh" }}>
        <NavBar />
        <h1
          style={{
            marginTop: "80px",
            fontFamily: "Roboto Slab, serif",
            fontStyle: "italic",
          }}
        >
          List of customer requirements
        </h1>
        <div
          className="container"
          style={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          {requirements.length === 0 ? (
            <h2>No data Available at the moment!</h2>
          ) : (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ width: "85%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Address</th>
                  <th>Service Required</th>
                  <th>Experience Required</th>
                </tr>
              </thead>
              <tbody>
                {requirements === [] ? (
                  <h1>Loading</h1>
                ) : (
                  requirements.map((requirement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{requirement.name}</td>
                      <td>{requirement.email}</td>
                      <td>{requirement.mobile}</td>
                      <td>{requirement.address}</td>
                      <td>{requirement.service}</td>
                      <td>{requirement.experience}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requirements;
