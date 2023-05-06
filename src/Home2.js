import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Sansita&display=swap');
</style>;

function Home2() {
  const user = localStorage.getItem("Profile");
  return (
    <>
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
          उन्नति - एक सेवा प्रदाता
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
                हमारे ग्राहकों की आवश्यकताओं को देखें
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
                  अभी एक्सप्लोर करें{" "}
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
                स्थानीय श्रमिकों की उन्नति के लिए और उन लोगों के लिए जिन्हें श्रमिकों की आवश्यकता है,उन्नति में आपका स्वागत है |<br />
                <br /> यहां, हम स्थानीय के लिए और उसके लिए विभिन्न सेवाएं प्रदान करते हैं
                नौकरानियों, प्लंबर, जैसे हमारे दैनिक सेवाओं के लिए कर्मचारी
                बढ़ई, बिजली मिस्त्री, चित्रकार आदि।
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
                  अभी एक्सप्लोर करें{" "}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home2;
