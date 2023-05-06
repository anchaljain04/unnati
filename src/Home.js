import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MainLoader from "./MainLoader";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Sansita&display=swap');
</style>;

function Home() {
  const [loader, setLoader] = useState(true);
  const user = localStorage.getItem("Profile");
  // console.log(JSON.parse(user).category)
  return (
    <>
      {/* {loader ? (
        <MainLoader setLoader={setLoader} />
      ) : (
        <> */}
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
          position: "fixed",
          overflowY: "hidden",
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
            textShadow: "1px 1px var(--secondary-color-light)",
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
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            background: "white",
            marginTop: "30px",
            color: "var(--primary-color)",
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
                  fontSize: "32px",
                  fontStyle: "italic",
                  color: "var(--primary-color)",
                  fontWeight: "600",
                  fontFamily: "'Sansita', sans-serif",
                }}
              >
                Welcome to UNNATI for the unnati of local workers and for people
                who need workers .<br />
                <br /> Here, we provide various services of and for local
                workers for our day to day services like maids, plumbers,
                carpenters, electricians, painters etc.
              </h2>
              <br />
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
                    border: "1px solid var(--primary-color)",
                  }}
                >
                  Explore Now{" "}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
// </>
// );
// }

//backgroundImage: 'url("/images/back.jpg")',
export default Home;
