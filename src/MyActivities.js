import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import moment from "moment";
import { Table } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AppContext from "./context/AppContext";

import Tooltip from "@mui/material/Tooltip";

function MyActivities() {
  const userData = localStorage.getItem("Profile");
  const user = JSON.parse(userData);
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
  const [requirementData, setRequirementData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/get-requirements", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        setRequirementData(res.data);
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  const handleDelete = (e, requirement) => {
    axios
      .delete("http://localhost:8000/user/delete-requirement", {
        params: {
          requirementId: requirement?._id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const updatedData = requirementData.filter(
            (item) => item?._id !== requirement?._id
          );
          setRequirementData(updatedData);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: 'url("/images/bg4.png")',
        height: "100vh",
      }}
    >
      <NavBar />
      <h2
        style={{
          marginTop: "50px",
          fontFamily: "Roboto Slab, serif",
          fontStyle: "italic",
          color: "white",
          textShadow: "1px 1px black",
        }}
      >
        {data?.myActivitiesTitle}
      </h2>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        {requirementData.length === 0 ? (
          <>
            <h2
              style={{
                color: "white",
              }}
            >
              {data?.myActivitiesEmpty}
            </h2>
          </>
        ) : (
          <>
            <Table
              bordered
              hover
              
              style={{ width: "75%", margin: "auto" }}
            >
              <thead style={{ background: "#330033", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>{data?.serviceRequired}</th>
                  <th>{data?.requiredExperience}</th>
                  <th>{data?.address}</th>
                  <th>{data?.dateOfPosting}</th>
                  <th>{data?.action}</th>
                </tr>
              </thead>
              <tbody style={{ background: "#990099" , color:"white"}}>
                {requirementData === [] ? (
                  <h1>{data?.loading}</h1>
                ) : (
                  requirementData.map((requirement, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.[requirement.service + "Service"]}</td>
                      <td>{requirement.experience}</td>
                      <td>{requirement.address}</td>
                      <td>
                        {moment(requirement.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <Tooltip
                          title={
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {data?.delete}
                            </span>
                          }
                          placement="right"
                        >
                          <button
                            onClick={(e) => handleDelete(e, requirement)}
                            style={{ background: "none", border: "none" }}
                          >
                            <DeleteOutlineIcon style={{ color: "white" }} />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

export default MyActivities;
