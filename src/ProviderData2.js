import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Table } from "react-bootstrap";
import PostRequirement2 from "./PostRequirement2";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";

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

export default function ProviderData2() {
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
      subject: `${location} की सेवा के लिए कनेक्शन अनुरोध`,
      userName: user?.name,
      to: provider?.email,
      service:
        provider.serviceProviding.charAt(0) +
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
      <NavBar2 />
      <h1
        style={{
          marginTop: "50px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
          color: "white",
          textShadow: "2px 2px black",
        }}
      >
        {location.toLocaleUpperCase()} के लिए सेवा प्रदाताओं की सूची 
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
            फिलहाल कोई डेटा उपलब्ध नहीं है!
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
                <th>पूरा नाम</th>
                <th>ईमेल</th>
                <th>फ़ोन नंबर</th>
                
                <th>उपलब्धता</th>
                <th>अनुभव</th>
                <th>उपलब्धता</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {providers === [] ? (
                <h1>लोड हो रहा है</h1>
              ) : (
                providers.map((provider, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{provider.name}</td>
                    <td>{provider.email}</td>
                    
                    <td>{provider.address}</td>
                    <td>हाँ</td>
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
                          जोड़ना
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
        उपयुक्त प्रदाता नहीं मिला?
          <br />
          अपनी आवश्यकता अभी पोस्ट करें:
        </h4>
        <PostRequirement2 />
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
              <h4>आपने सफलतापूर्वक अनुरोध भेज दिया है।</h4>
              <br />
              <h4>
              प्रदाता का विवरण आपको आपके पंजीकृत पर भेजा जाएगा
                ईमेल, एक बार जब वह अपनी उपलब्धता की पुष्टि करता है।
              </h4>
              <br />
              <h5>आपकी विज़िट के लिए धन्यवाद।</h5>
            </div>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <button onClick={handleClose}>बंद</button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
