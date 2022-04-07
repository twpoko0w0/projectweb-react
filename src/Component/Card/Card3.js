import React, { useEffect, useState } from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CardRandom from "./Card3data";
import axios from "axios";

const GridCard = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  
`;
const StyleCard = styled.div`
  .card.mos {
    text-decoration: none;
    cursor: pointer;
  }
  .card.mos:hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
  }
  .card-title1{
    display: "flex" ;
  }
  .work-box{
     margin-top: 8rem;
     padding: 0px  6px; 
     padding-top: 10px ;
  }
`;
const ButtonStyle = styled.button`
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

function Card31({ items }) {
  return (
    <>
      {
        items.map((elem) => {
          const { id, project_name, project_image_link, project_category_name, project_tag_name } = elem;
          const tagList = project_tag_name.split(",")

          function TrimTagListName(tag) {
            return tagList.length < 2 ? tagList[tag] : tagList[tag].length > 16 ? tagList[tag].substring(0, 15) + "..." : tagList[tag]
          }

          return (
            <StyleCard key={id}>
              <Card
                className=" bg-white  border-white shadow  mos"
                style={{
                  width: "356px",
                  height: "317px",
                  borderRadius: "10px 10px 8px 8px",
                  marginTop: "40px ",
                }}
                as={Link}
                to={`/ProjectDetail/${id}`}
              >
                {/* <Link to={`/ProjectDetail/${id}`}></Link> */}
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
                  src={project_image_link}
                  alt={project_name}
                />
                <Card.ImgOverlay style={{ maxHeight: "200px", padding: "8px" }}>
                  <div
                    className="card-title1"
                  >
                    <Row className="grid_2">
                      <Col> <button className="C1" style={{ float: "right" }}>{project_category_name}</button></Col>
                    </Row>
                    <Row
                      className="grid_1"
                      style={{ paddingTop: "4px" }}
                    >
                      {
                        tagList.length <= 2 ?
                          <Col className="work-box">
                            <button className="work">{TrimTagListName(0)}</button>
                            {tagList.length === 1 ? null : <button className="work">{TrimTagListName(1)}</button>}
                          </Col> :
                          <Col className="work-box" >
                            <button className="work">{TrimTagListName(0)}</button>
                            <button className="work">{TrimTagListName(1)}</button>
                            <button className="work">+ {tagList.length - 2}</button>
                          </Col>}
                    </Row>

                  </div>
                </Card.ImgOverlay>
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>{project_name}</Card.Title>
                </Card.Body>
              </Card>

            </StyleCard>

          );
        })}
    </>
  );
}

export default function Card3({ items }) {
  const [show, setShow] = useState(false);

  return (
    <div className="BG-card">
      <Container fluid="lg" style={{ maxWidth: "1140px", padding: "0" }}>
        <div className="grd" style={{ padding: "72px 0" }}>
          <GridCard>
            <Card31 items={items} />
          </GridCard>
          {show ? (
            <GridCard>
              <Card31 items={items} />
            </GridCard>
          ) : null}
          <div
            className="butTom"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "124px ",
            }}
          >
            <Button
              onClick={() => setShow(!show)}
              style={{ padding: "10px 62px" }}
            >
              ดูเพิ่มเติม
            </Button>
          </div>
        </div>
      </Container>

    </div>
  );
}
