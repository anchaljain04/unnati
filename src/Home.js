import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AppContext from "./context/AppContext";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Sansita&display=swap');
</style>;

function Home() {
  const user = localStorage.getItem("Profile");
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;

  return (
    <>
      {/* <ToastComp style={{position:"fixed" , top:0 ,right:"40px"}}/> */}
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
          {data?.homeTitle}
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
              <h2
                style={{
                  fontSize: "32px",
                  fontStyle: "italic",
                  color: "var(--primary-color)",
                  fontWeight: "600",
                  fontFamily: "'Sansita', sans-serif",
                }}
              >
                {data?.homeDivP}
              </h2>
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
                    background:
                      "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid var(--primary-color)",
                  }}
                >
                  {data?.exploreNow}{" "}
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
                {data?.homeDivC[0]}
                <br />
                <br />
                {data?.homeDivC[1]}
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
                  {data?.exploreNow}{" "}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
