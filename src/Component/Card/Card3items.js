import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import Card3Test from "./Card3Test";

const StyleCard = styled.div`
  .card.mos {
    text-decoration: none;
    cursor: pointer;
  }
  .card.mos:hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
  }
`;
const Button = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");

  button {
    margin: 0px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    position: relative;
  }
  .งานอ {
    background-color: #1ac3cc;
    border: 1px solid #1ac3cc;
  }
`;
const ColorButton = styled.div`
  .lvworkf {
    background-color: #ffa62b;
    border: 1px solid #ffa62b;
  }
`;
// seriousness
export default function Card3item({ title, Img, Cat, seriousness }) {
  return (
    <StyleCard>
      <Card
        className=" bg-white  border-white shadow  mos"
        style={{
          width: "356px",
          height: "317px",
          borderRadius: "10px 10px 8px 8px",
          marginTop: "40px ",
        }}
        as={Link}
        to="/ProjectDetail"
      >
        <Card.Img
          style={{
            marginTop: "0",
            width: "100%",
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
              <button className="work">UX/UI</button>{" "}
            </div>
            <div className="grid_2" style={{ float: "right" }}>
              <button className="C1">{Cat}</button>
            </div>
          </div>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{title}</Card.Title>
          <ColorButton>
            <Button className="lvworkf">{seriousness}</Button>
          </ColorButton>{" "}
          {/* {Tag1} */}
        </Card.Body>
      </Card>
    </StyleCard>
  );
}
