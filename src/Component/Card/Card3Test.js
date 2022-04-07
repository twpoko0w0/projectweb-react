import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Img =
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80";
const StyleCard = styled.div`
  .card.mos {
    text-decoration: none;
    cursor: pointer;
  }
  .card.mos:hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
  }
`;
const ColorButton = styled.div`
  button {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    position: relative;
  }
  .lvworkf {
    background-color: #ffa62b;
    border: 1px solid #ffa62b;
  }
`;
export default function Card3item() {
  return (
    <StyleCard>
      <Card
        className=" bg-white  border-white shadow  mos"
        style={{
          Width: "356px",
          Height: "317px",
          borderRadius: "10px 10px 8px 8px",
          marginTop: "40px ",
        }}
        as={Link}
        to="/ProjectDetail"
      >
        <Card.Img
          style={{
            marginTop: "0",
            
            width: "356px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
          variant="top"
          src={Img}
        />
        <Card.ImgOverlay style={{ maxHeight: "200px", padding: "8px" }}>
          <div
            className="card-title1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              className="grid_1"
              style={{ marginTop: "10rem", paddingTop: "4px" }}
            >
              <button className="work">Front-end</button>{" "}
              <button className="work">Back-end</button>{" "}
            </div>
            <div className="grid_2" style={{ float: "right" }}>
              <button className="C1">Design</button>
            </div>
          </div>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title style={{ color: "black" }}>Web Grab</Card.Title>
          <ColorButton>
            <button className="lvworkf">ผลงาน</button>
          </ColorButton>{" "}
        </Card.Body>
      </Card>
    </StyleCard>
  );
}
