import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Table } from "react-bootstrap";
import PostRequirements from "./PostRequirements";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

export default function ProviderData() {
  const location = window.location.pathname.split("/").pop();
  const [providers, setProviders] = useState([]);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/provider/get-providers/${location}`)
      .then((res) => {
        axios
          .get("http://localhost:8000/user/get-connection-requests", {
            params: { userId: user?._id },
          })
          .then((response) => {
            const userRequest = response.data.filter(
              (item) => item.sentBy === "user"
            );
            const data = res.data.map((item) => {
              let firstAttempt = false;
              userRequest.map((ele) => {
                if (
                  firstAttempt ||
                  (ele.providerId._id === item._id &&
                    ele.userId._id === user?._id)
                ) {
                  item.isRequestSent = true;
                  firstAttempt = true;
                  return item;
                } else {
                  item.isRequestSent = false;
                }
                return item;
              });
              return item;
            });
            setProviders(data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const handleConnectClick = (e, provider) => {
    e.preventDefault();
    handleOpen();

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
    <div
      style={{
        textAlign: "center",
        backgroundImage: 'url("/images/bg4.png")',
        height: "100vh",
        paddingBottom: "20px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <NavBar />
      <h1
        style={{
          marginTop: "50px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
          color: "white",
          textShadow: "2px 2px black",
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
          <h2
            style={{
              color: "white",
              textShadow: "2px 2px black",
            }}
          >
            No data Available at the moment!
          </h2>
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
                      {provider.isRequestSent ? (
                        "sent"
                      ) : (
                        <button
                          onClick={(e) => handleConnectClick(e, provider)}
                        >
                          connect
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
        <h4 style={{ marginTop: "50px", color: "white",textShadow: "2px 2px black", }}>
          Not found suitable provider?
          <br />
          Post your requirement now:
        </h4>
        <PostRequirements />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ textAlign: "center" }}>
              <h4>You have successfully sent the request.</h4>
              <br />
              <h4>
                The provider's details will be sent to you on your registered
                email, once he/she confirms his/her availability.
              </h4>
              <br />
              <h5>Thank you for your visit.</h5>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button onClick={handleClose}>Close</button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
