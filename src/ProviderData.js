import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";

export default function ProviderData() {
  const location = window.location.pathname.split("/").pop();
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/provider/get-providers/${location}`)
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => console.log(error));
  }, [location]);

  return (
    <div style={{textAlign:'center',    background: "pink",height:'100vh'}}>
      <NavBar />
      <h1 style={{marginTop:'80px',fontFamily: 'Roboto Slab, serif', fontStyle:'italic'}}>List of Service Providers for {location.toLocaleUpperCase()} service</h1>
      <div className="container"
        style={{
          marginTop: "50px",
          textAlign:'center',
        }}
      >
        {providers.length === 0 ? (
          <h2>No data Available at the moment!</h2>
        ) : (
          <Table striped bordered hover variant="dark" style={{width:'85%', margin:'auto'}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Availability</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {providers === [] ? (
                <h1>Loading</h1>
              ) : (
                providers.map((provider, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{provider.name}</td>
                    <td>{provider.email}</td>
                    <td>{provider.mobile}</td>
                    <td>{provider.address}</td>
                    <td>Yes</td>
                    <td>{provider.experience}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
