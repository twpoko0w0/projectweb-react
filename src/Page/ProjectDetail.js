import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar1 from "../Component/Navbar";
import styled from "styled-components";
import Tab from "../Component/Tab";
import Tab1 from "../Component/Tab1";
import CardProfile from "../Component/Card/CardProfile";
import axios from "axios";

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

function ProjectDetail() {
  const [card, setCard] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:44343/api/project").then((response) => {
      setCard(response.data);
      // console.log(response.data)
    });
  }, []);

  const ElementCard =  card.map((val)=>{
    return (
      <div>
        <Navbar1 />
        <Container style={{ maxWidth: "1140px" }}>
            <StyleDetail>
              <img
                className="img-fluid sIm"
                src={val.project_image_link}
                style={{ width: "451px", height: "254px" }}
              />
              <div className="Detail">
                <a>{val.project_category_name}</a>
                {/* <a>sada</a> */}
                <div className="H4Grid">
                  <h4>
                    {val.project_name}
                    <ColorButton>
                      <Button className="Lv_c">{val.project_seriousness_name}</Button>
                    </ColorButton>{" "}
                  </h4>
                </div>
                <span className="Text-D">
                  {val.project_detail}
                </span>
              </div>
            </StyleDetail>
          </Container>
        <Tab1 />
        {/* <CardProfile/> */}
      </div>
    );
  })
  return (
  <>
    {ElementCard}
  </>)
}

export default ProjectDetail;
