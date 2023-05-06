import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";

export default function Services2() {
  const navigate = useNavigate();
  let user = localStorage.getItem("Profile");
  const handleClick = (service) => {
    user
      ? navigate(`/services/${service}`)
      : window.alert(
          "प्रदाताओं का विवरण देखने के लिए आपको पहले लॉगिन करना होगा!"
        );
  };
  return (
    <div>
      <NavBar2 />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "25px 100px",
          justifyContent: "center",
          backgroundImage: 'url("/images/bg4.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/maidPic.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>नौकरानी सेवाएं</Card.Title>
            <Card.Text>
              अपने घर को साफ और स्वच्छ बनाना चाहते हैं। हमारे विश्वसनीय नौकरानियों को रहने दो
              आपके घरेलू कामों में आपकी मदद करते हैं। उनसे संपर्क करने के लिए नीचे क्लिक करें
              सफाई, बर्तन धोने आदि के लिए
            </Card.Text>

            <Button
              align="center"
              onClick={(e) => handleClick("maid")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/carpenter.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>बढ़ई सेवाएं</Card.Title>
            <Card.Text>
            चाहते हैं कि कोई भी ढांचे का निर्माण, मरम्मत या स्थापित करे और
              आपके घर के लिए संरचना। हमारे मेहनती से संपर्क करने के लिए नीचे क्लिक करें
              सहकारी बढ़ई|
            </Card.Text>
            <Button
              onClick={(e) => handleClick("carpenter")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/electrician.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>इलेक्ट्रीशियन सेवाएं</Card.Title>
            <Card.Text>
            अपने खोए हुए तारों को ठीक करना चाहते हैं। हमसे संपर्क करने के लिए नीचे क्लिक करें
              बिजली के सभी प्रकार के काम के लिए इलेक्ट्रीशियन जैसे
              फिटिंग, रीवायरिंग, मरम्मत, स्थापना इत्यादि।
            </Card.Text>
            <Button
              onClick={(e) => handleClick("electrician")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
        <br />
        <br />
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/pplumber.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>प्लंबर सेवाएं</Card.Title>
            <Card.Text>
              लीकेज ठीक करना चाहते हैं। हमारे प्लंबर से संपर्क करने के लिए नीचे क्लिक करें
              पानी, गैस या कोई भी ले जाने वाले पाइप और जुड़नार स्थापित या मरम्मत करें
              तरल।
            </Card.Text>
            <br />
            <Button
              onClick={(e) => handleClick("plumber")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/painter.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>पेंटर सेवाएं</Card.Title>
            <Card.Text>
            अपनी दीवारों को ठीक करना चाहते हैं और अपनी जगह को अधिक जीवंत बनाना चाहते हैं
              रंग की। पेंट और अन्य सजावटी सामग्री लगाने के लिए हमारे पेंटर्स से संपर्क करें
              खत्म।
            </Card.Text>
            <Button
              onClick={(e) => handleClick("painter")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            margin: "25px",
            height: "26rem",
            border: "2px solid var(--primary-color)",
          }}
        >
          <Card.Img
            variant="top"
            src="/images/chef.jpg"
            width="280px"
            height="180px"
          />
          <Card.Body>
            <Card.Title>बावर्ची सेवाएं</Card.Title>
            <Card.Text>
              मुंह में पानी लाने वाला खाना चाहते हैं। हमारे रसोइयों और रसोइयों से संपर्क करें
              स्वस्थ, पौष्टिक और स्वादिष्ट भोजन करें।
            </Card.Text>
            <br />
            <Button
              onClick={(e) => handleClick("chef")}
              style={{
                background:
                  "linear-gradient(to bottom left, #800080 0%, #da71b7 71%)",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid var(--primary-color)",
              }}
            >
              अन्वेषण{" "}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
