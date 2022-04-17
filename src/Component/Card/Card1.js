import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";

const StyleCard1 = styledComponents.div`
.card.project {
  text-decoration: none;
  cursor: pointer;
  width: 641px ;
  height: 361px ;
}
.img-f{
 
  position: relative
  width: 641px;
  height: 361px;
  object-fit: cover;
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
  bottom: 0% ;
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
button {
  margin: 0px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  font-size: 14px;
  color:#fff;
  border-radius: 4px;
 
}

`;

export default function Card1({ project }) {
  const bestProject = project.filter(x => x.id === 90).map((x, index) => {
    const tagList = x.project_tag_name.split(",")

    function TrimTagListName(tag) {
      return tagList.length < 2 ? tagList[tag] : tagList[tag].length > 26 ? tagList[tag].substring(0, 25) + "..." : tagList[tag]
    }
    return (
      <>
        <Card
          className="bg-white  border-white project "
          as={Link}
          to={`/ProjectDetail/${x.id}`}
        >
          <Card.Img
            className="img-f"
            variant="top"
            src={x.project_image_link}

          />
          <div className="box-btnCat">
            {" "}
            <button className="Cat-btn" >
              {x.project_category_name}
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

        </Card>
        <Card.Body >
          <Card.Title style={{ color: "black" }}>{x.project_name}</Card.Title>
          <button className="lvwork"
            style={x.project_seriousness_name === "งานอดิเรก" ?
              { backgroundColor: "#1AC3CC", border: "1px solid #1AC3CC" } :
              { backgroundColor: "#FFA62B", border: "1px solid #FFA62B" }
            }
          >{x.project_seriousness_name}</button>
        </Card.Body>
      </>
    )
  })
  return (
    <StyleCard1>
      {bestProject}

    </StyleCard1>
  );
}
