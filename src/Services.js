import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import AppContext from "./context/AppContext";

export default function Services() {
  const navigate = useNavigate();
  const myContext = useContext(AppContext);
  const data = myContext.isHindi ? myContext.dataHindi : myContext.dataEnglish;
  let user = localStorage.getItem("Profile");
  const handleClick = (service) => {
    user
      ? navigate(`/services/${service}`)
      : window.alert(
          "You need to login first to see the details of providers!"
        );
  };
  return (
    <div>
      <NavBar />
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
            <Card.Title>{data?.maidService + " " + data?.services}</Card.Title>
            <Card.Text>
              {data?.maidText}
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
              {data?.explore}{" "}
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
            <Card.Title>
              {data?.carpenterService + " " + data?.services}
            </Card.Title>
            <Card.Text>
              {data?.carpenterText}
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
              {data?.explore}{" "}
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
            <Card.Title>
              {data?.electricianService + " " + data?.services}
            </Card.Title>
            <Card.Text>
              {data?.electricianText}
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
              {data?.explore}{" "}
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
            <Card.Title>
              {data?.plumberService + " " + data?.services}
            </Card.Title>
            <Card.Text>
              {data?.plumberText}
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
                marginTop: "-40px"
              }}
            >
              {data?.explore}{" "}
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
            <Card.Title>
              {data?.painterService + " " + data?.services}
            </Card.Title>
            <Card.Text>
              {data?.painterText}
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
              {data?.explore}{" "}
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
            <Card.Title>{data?.chefService + " " + data?.services}</Card.Title>
            <Card.Text>
              {data?.chefText}
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
              {data?.explore}{" "}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
