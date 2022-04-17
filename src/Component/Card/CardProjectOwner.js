import React, { useEffect, useState } from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CardRandom from "./Card3data";
import axios from "axios";

const StyleCard = styled.div`
.grd{
    padding: 72px 0 ;
  }
  .butTom{
    display: flex;
    justify-content: center;
    margin: 124px 0 ;
  }
  .show-btn{
    padding: 10px 62px;
  }
  .card.project {
    text-decoration: none;
    cursor: pointer;
    width: 356px ;
    height: 317px ;
    border-radius: 8px ;
    margin-top: 40px ;
  }
  .card.project:hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
  }
  .Img-Card{
    position: relative;
    marginTop: 0;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 8px 0 0 ;
  }
  .card-title1 {
    display: "flex";
  }
  .box-btnCat{
    position: absolute;
    margin-top: 10px;
    margin-right: 6px;
    right:0 ;
  }
  .box-btnTag{
    position: absolute;
    margin-left: 6px;
    bottom: 38% ;
  }

  button {
    margin: 0px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    font-size: 14px;
    color:#fff;
    border-radius: 4px;
   
}
.work-btn{
    background-color: #3082FE;
    border: 1px solid #3082FE;
    color: #fff;
    height: 16px;
    line-height: 14px;
    border-radius: 6px;
    margin: 0px 4px;
    padding: 0px 2px;
    font-size: 14px;
}
.Cat-btn{
    color: #000;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #fff;
}
.lvwork{
  margin-top: 10px;
}
`;


function CardProjectOwner({ userProjectFilter }) {

    return (
        < >
            {
                userProjectFilter.map((elem) => {
                    const { id, project_name, project_image_link, project_category_name, project_tag_name, project_seriousness_name } = elem;
                    const tagList = project_tag_name.split(",")

                    function TrimTagListName(tag) {
                        return tagList.length < 2 ? tagList[tag] : tagList[tag].length > 16 ? tagList[tag].substring(0, 15) + "..." : tagList[tag]
                    }

                    return (
                        <Col sm="auto" >
                            <Card
                                key={id}
                                className=" bg-white  border-white shadow project "
                                as={Link}
                                to={`/ProjectDetail/${id}`}

                            >
                                <Card.Img
                                    className="Img-Card"
                                    variant="top"
                                    src={project_image_link}
                                    alt={project_name}
                                />
                                <div className="box-btnCat">
                                    {" "}
                                    <button className="Cat-btn" >
                                        {project_category_name}
                                    </button>
                                </div>
                                <div className="box-btnTag">
                                    {tagList.length <= 2 ? (
                                        <div >
                                            <button className="work-btn">{TrimTagListName(0)}</button>
                                            {tagList.length === 1 ? null : (
                                                <button className="work-btn">{TrimTagListName(1)}</button>
                                            )}
                                        </div>
                                    ) : (
                                        <div >
                                            <button className="work-btn">{TrimTagListName(0)}</button>
                                            <button className="work-btn">{TrimTagListName(1)}</button>
                                            <button className="work-btn">+ {tagList.length - 2}</button>
                                        </div>
                                    )}
                                </div>
                                <Card.Body>
                                    <Card.Title style={{ color: "black" }}>
                                        {project_name}
                                    </Card.Title>
                                    <button className="lvwork"
                                        style={project_seriousness_name === "งานอดิเรก" ?
                                            { backgroundColor: "#1AC3CC", border: "1px solid #1AC3CC" } :
                                            { backgroundColor: "#FFA62B", border: "1px solid #FFA62B" }
                                        }
                                    >{project_seriousness_name}</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
        </>
    );
}

export default function Card3({ userProjectFilter }) {
    const [show, setShow] = useState(false);
    const props = { userProjectFilter }
    return (
        <StyleCard className="BG-card">
            <Container fluid="lg" style={{ maxWidth: "1140px", padding: "0" }}>
                <div className="grd" >
                    <Row>
                        <CardProjectOwner {...props} />
                    </Row>
                    {show ? (
                        <Row>
                            <CardProjectOwner {...props} />
                        </Row>
                    ) : null}
                    <div
                        className="butTom"
                    >
                        <Button
                            onClick={() => setShow(!show)}

                        >
                            ดูเพิ่มเติม
                        </Button>
                    </div>
                </div>
            </Container>

        </StyleCard>
    );
}
