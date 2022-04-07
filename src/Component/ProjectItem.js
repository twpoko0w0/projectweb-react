import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar1 from "../Component/Navbar";
import styled from "styled-components";
import Tab from "../Component/Tab";
import Tab1 from "../Component/Tab1";
import CardProfile from "../Component/Card/CardProfile";
import axios from "axios";
import { Link } from 'react-router-dom';

const StyleDetail = styled.div`
  margin: 36px 0px;
  display: grid;
  grid-template-columns: 500px auto;
  .Detail {
    padding: 0px 20px;
  }
  .H4Grid {
    margin-top: 10px;
    display: grid;
    grid-template-columns: auto auto;
  }
  .Text-D {
    padding: 0px;
    margin: 0px;
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
  .Lv_c {
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

export function ProjectItem({ item: { id, project_name, project_image_link, project_category_name, project_seriousness_name, project_detail } }) {
    return (
        <div>
            <Navbar1 />
            <Container style={{ maxWidth: "1140px" }}>
                <StyleDetail>
                    <img
                        className="img-fluid sIm"
                        src={project_image_link}
                        style={{ width: "451px", height: "254px" }}
                        alt="img"
                    />
                    <div className="Detail">
                        <a>{project_category_name}</a>
                        {/* <a>sada</a> */}
                        <div className="row">
                            <div className="col-6">
                                <h4>
                                    {project_name}
                                </h4>
                            </div>
                            <div className="col-6">
                                <ColorButton>
                                    <Button className="Lv_c">{project_seriousness_name}</Button>
                                </ColorButton>{" "}
                            </div>
                        </div>

                        <span className="Text-D">
                            {project_detail}
                        </span>
                    </div>
                </StyleDetail>
            </Container>
            <Tab1 />
            <Link to={`ProjectItem/${id}`}></Link>
            {/* <CardProfile/> */}
        </div>
    );
}