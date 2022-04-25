import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Gridcardsm = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");

  font-family: "Roboto", sans-serif;

  .img-card2 {
    align-self: center;
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
    margin-right:  4px;
    padding: 0px 2px;
    font-size: 14px;
  }
  .lvwork{
    background-color: #FFA62B;
    border: 1px solid #FFA62B;
  }

`;

export default function Card2({ project }) {
  return (
    <>

      {project.filter(x => x.id > 100 && x.id < 104).map((x) => {
        const tagList = x.project_tag_name.split(",")
        function TrimTagListName(tag) {
          return tagList.length < 2 ? tagList[tag] : tagList[tag].length > 10 ? tagList[tag].substring(0, 9) + "..." : tagList[tag]
        }
        return (
          <>
            <Card
              className="  bg-white  border-white"
              style={{ maxwidth: "450px", Height: "100%", color: "black", textDecoration: "none" }}
              as={Link}
              to={`/ProjectDetail/${x.id}`}

            >
              <Gridcardsm>
                <Row>
                  <Col sm="auto">
                    <Image
                      className="img-card2"
                      style={{
                        width: "190px",
                        height: "107px",
                        objectFit: "cover",
                      }}
                      src={x.project_image_link}
                      rounded
                    />
                  </Col>
                  <Col style={{ padding: " 0" }}>
                    <Card.Body style={{ paddingTop: "0" }}>
                      <Card.Text style={{ marginBottom: "4px", textAlign: "left" }}>
                        {x.project_category_name}
                      </Card.Text>
                      <Card.Subtitle className="text-muted" style={{ float: "left" }}>
                        {x.project_name}
                      </Card.Subtitle>
                      <br />
                      <div className="Grid_w" style={{ marginTop: "0px", float: "left" }}>

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
                      <br />
                      <div className="Grid_D" style={{ marginTop: "8px", float: "left" }}>
                        <button className="lvwork"
                          style={x.project_seriousness_name === "งานอดิเรก" ?
                            { backgroundColor: "#1AC3CC", border: "1px solid #1AC3CC" } :
                            { backgroundColor: "#FFA62B", border: "1px solid #FFA62B" }
                          }
                        >{x.project_seriousness_name}</button>{" "}
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Gridcardsm>
            </Card>
            <hr style={{ width: "90%", alignSelf: "center" }} />
          </>
        )
      })}

    </>
  );
}