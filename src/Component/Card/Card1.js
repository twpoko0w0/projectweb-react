import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./Card1.css";

export default function Card1() {
    
  return (
    <Card
      style={{ maxWidth: "641px", height: "361px" }}
      className="bg-white  border-white"
    >
      <Card.Img
        style={{
          marginTop: "0",
          maxWidth: "641px",
          height: "361px",
          objectFit: "cover",
        }}
        className="img-fluid"
        variant="top"
        src="https://images.unsplash.com/photo-1619115445441-d6e75309000d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29kZWluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      />

      <Card.ImgOverlay
        style={{ padding: "10px", Height: "361px", Width: "641px" }}
      >
        <div className="card-title">
          <div className="Tag_W">
            <button className="work">Back-End</button>
            {"  "}
            <button className="work">Front-end</button>{" "}
            <button className="work">UX/UI</button>
            {""}
          </div>

          <div className="Tag_C">
            <button className="C1">Film & Video</button>{" "}
            <button className="C1">Design</button>{" "}
            <button className="C1">Technology</button>{" "}
          </div>
        </div>
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <div className="Tag_S">
          <button className="lv_work">ผลงาน</button>{" "}
        </div>
      </Card.Body>
    </Card>
  );
}
