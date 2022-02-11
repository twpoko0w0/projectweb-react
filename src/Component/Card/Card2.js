import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card2.css";

const Gridcardsm = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");

  font-family: "Roboto", sans-serif;
  display: grid;
  grid-template-columns: 200px auto;

  .img-card2 {
    align-self: center;
  }
`;

export default function Card2() {
  return (
    <Card
      className="  bg-white  border-white"
      style={{ maxwidth: "450px", Height: "100%" }}
    >
      <Card11 />
      <hr style={{ width: "90%", alignSelf: "center" }} />
      <Card11 />
      <hr style={{ width: "90%", alignSelf: "center" }} />
      <Card11 />
    </Card>
  );
}
class Card11 extends React.Component {
  render() {
    return (
      <>
        <Gridcardsm>
          <Image
            className="img-card2"
            style={{
              marginLeft: "10px",
              width: "190px",
              height: "107px",
              objectFit: "cover",
            }}
            src="https://images.unsplash.com/photo-1627534414302-778011a206fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"
            rounded
          />
          <Card.Body style={{ paddingTop: "0" }}>
            <Card.Text style={{ marginBottom: "4px", textAlign: "left" }}>
              Design
            </Card.Text>
            <Card.Subtitle className="text-muted" style={{ float: "left" }}>
              Marketing Management
            </Card.Subtitle>
            <br />
            <div className="Grid_w" style={{ marginTop: "0px", float: "left" }}>
              <button className="work">Back-end</button>{" "}
              <button className="work">Front-end</button>{" "}
            </div>
            <br />
            <div className="Grid_D" style={{ marginTop: "8px", float: "left" }}>
              <button className="lv_work">ผลงาน</button>{" "}
            </div>
          </Card.Body>
        </Gridcardsm>
      </>
    );
  }
}
