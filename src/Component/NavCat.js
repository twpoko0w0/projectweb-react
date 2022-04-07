import React, { useState } from "react";
import { Container, Nav, Button, Row, Col } from "react-bootstrap";

import Card3data from "./Card/Card3data";
import NavcatITems from "./NavCatitems";
import Dropdown1 from "./Dropdown/DropdownCat";
import styled from "styled-components";
import Combobox from "./Combobox/Bobox";
import FilterIcon from "./logo/filter_list_black_24dp.svg";
import Card3 from "./Card/Card3";

const ButtonStyle = styled.div`
  .filter {
    width: 96px;
    height: 44px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #dcdcdc;
  }
  .filter_icon {
    font-size: 20px;
    padding: 0px 2px;
    margin-left: 4px;
    float: left;
  }
`;
const Content = styled.div`
  .content {
    padding-top: 50px;
  }
`;
const TextStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");
  a.Text_a {
    font-family: "Roboto", sans-serif;
    padding: 8px 16px;
  }
`;

export default function Navcat() {
  const [isOpen, setIsOpen] = useState(false);
  const [items,setItems] = useState(Card3data);

  const filrerItems = (categItem) =>{
    const updatedIteams = Card3data.filter((curElem)=>{
      return curElem.Cat === categItem ;
    })

    setItems(updatedIteams);
  }
  return (
    <div className="Grid_NAV">
      <hr />
      <Container fluid="lg" style={{ maxWidth: "1140px" }}>
        <TextStyle>
          <Nav
            className="justify-content-space-between"
            defaultActiveKey="/home"
            as="ul"
          >
            <Dropdown1 />
            <div className="animation start-ALL"></div>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="0"
            >
              All
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="1"
              onClick={() =>filrerItems('Art')}
            >
              Art
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="2"
            >
              Craft
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="3"
            >
              Design
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="4"
            >
              Film & Video
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="5"
            >
              Game
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="5"
            >
              Music
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="5"
            >
              Technology
            </Nav.Link>
            <Nav.Link
              style={{ padding: "8px 16px" }}
              className="Text_a"
              eventKey="5"
            >
              Other
            </Nav.Link>

            <div className="collapsible" style={{ alignSelf: "center" }}>
              <ButtonStyle>
                <Button
                  variant="light"
                  className="filter"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img
                    className="filter_icon"
                    src={FilterIcon}
                    alt="FilterIcon"
                  />
                  Filter
                </Button>
              </ButtonStyle>
            </div>
          </Nav>
        </TextStyle>

        {isOpen && (
          <Content>
            <Combobox />
          </Content>
        )}
      </Container>
      <hr style={{ marginBottom: "0" }} />
      <Container fluid ="lg" style={{maxWidth:"1140px"}}>
            <Card3/>
      </Container>
    </div>
  );
}
