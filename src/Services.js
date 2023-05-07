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
              Want to make your home clean and hygienic. Let our reliable maids
              help you with your household works. Click below to contact them
              for cleaning , washing dishes etc
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
              Want anyone to construct, repair or install frameworks and
              structure for your home . Click below to contact our hardworking
              cooperative carpenters
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
              Want to correct your lose wires . Click below to contact our
              electricians for all kinds of electrical work like
              fitting,rewiring, repairing, installing etc.
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
              Want to correct the leaks . Click below to contact our plumbers to
              install or repair pipes and fixtures carrying water, gas or any
              fluid.
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
              Want to fix your walls and make your place more lively filled with
              colors. Contact our painters to apply paints and other decorative
              finishes.
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
              Want to have mouth watering food. Contact our cooks and chefs to
              have healthy, nutritious and delicious meals.
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
