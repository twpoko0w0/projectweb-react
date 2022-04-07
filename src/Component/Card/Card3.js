import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Card3item from "./Card3items";
import CardRandom from "./Card3data";
import Card3Test from "./Card3Test";
import axios from "axios";

const GridCard = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: space-between;
`;
// const  ElementAll = c.map((Element,idex) => {
//     return <Card3item key={idex} {...Element}/>
// })

function Card31() {
  const [card, setCard] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/project").then((response) => {
      setCard(response.data);
      // console.log(response.data)
    });
  }, []);
  // const [selectedCard,setSelectedCard] = useState(null);

  // function onCheckCard(theCard) {
  //     setSelectedCard(theCard);
  // }
  // const CardPost = null;
  const EleCard = card.map((val) => {
    return (
      <div className="KeyCard" key={val.id}>
        {/* <Card3item {...val} /> */}
        <Card3item
          title={val.project_name}
          Img={val.project_image_link}
          Cat={val.project_category_name}
          seriousness={val.project_seriousness_name}
          detail ={val.project_detail}
          nameT = {val.project_seriousness_name}
        />
      </div>
    );
  });
  return <>{EleCard}</>;
}

export default function Card3() {
  const [show, setShow] = useState(false);

  return (
    <div className="BG-card">
      <Container fluid="lg" style={{ maxWidth: "1140px", padding: "0" }}>
        <div className="grd" style={{ padding: "72px 0" }}>
          <GridCard>
            <Card31 />
          </GridCard>
          {show ? (
            <GridCard>
              <Card31 />
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
