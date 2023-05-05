import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Table } from "react-bootstrap";
import PostRequirements from "./PostRequirements";

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

  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const handleConnectClick = (e, provider) => {
    e.preventDefault();
    const raw = {
      subject: `Connection Request for the service of ${location}`,
      userName: user?.name,
      to: provider?.email,
      service:
        provider.serviceProviding.charAt(0).toUpperCase() +
        provider.serviceProviding.slice(1),
      providerId: provider?._id,
      userId: user?._id,
    };
    axios
      .post("http://localhost:8000/user/send-email", raw)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ textAlign: "center", backgroundImage: 'url("/images/background.jpg")', height: "100vh" }}>
      <NavBar />
      <h1
        style={{
          marginTop: "90px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
          color: "white",
        }}
      >
        List of Service Providers for {location.toLocaleUpperCase()} service
      </h1>
      <div
        className="container"
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        {providers.length === 0 ? (
          <h2 style={{
            color:"white"
          }}>No data Available at the moment!</h2>
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
                <th>Availability</th>
                <th>Experience</th>
                <th>Availability</th>
                <th>Action</th>
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
                    <td>
                      {provider?.availabilityTime
                        ? provider?.availabilityTime
                        : "-"}
                    </td>
                    <td>
                      <button onClick={(e) => handleConnectClick(e, provider)}>
                        connect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
        <h3 style={{ marginTop: "50px" , color:"white" }}>
          Not found suitable provider?
          <br />
          Post your requirement now:
        </h3>
        <PostRequirements />
      </div>
    </div>
  );
}
