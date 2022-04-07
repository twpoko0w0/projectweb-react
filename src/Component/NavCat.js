import React, { useEffect, useState } from "react";
import { Container, Nav, Button, Row, Col } from "react-bootstrap";

import Card3data from "./Card/Card3data";
import NavcatITems from "./NavCatitems";
import Dropdown1 from "./Dropdown/DropdownCat";
import styled from "styled-components";
import Combobox from "./Combobox/Bobox";
import FilterIcon from "./logo/filter_list_black_24dp.svg";
import Card3 from "./Card/Card3";
import DataWork from "../data/Working";
import { ProjectItem } from "./ProjectItem";

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

export default function Navcat({ project, items, setItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState(project);
  // console.log("From Navcat: " + items);

  const handleSelect = (e) => {
    setTag(e.target.value)
  }

  const filrerItems = (categItem) => {
    const updatedIteams = project.filter((curElem) => {
      return curElem.project_category_name === categItem;
    })
    setItems(updatedIteams);
  }

  // const filrerItems1 = (categTag) => {
  //   const updatedTags = project.filter((curElem) => {
  //     return curElem.Tag01 === categTag;
  //   })
  //   setTag(updatedTags);
  // }

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
            <NavcatITems filrerItems={filrerItems} setItems={setItems} project={project} />

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
      <Container fluid="lg" style={{ maxWidth: "1140px" }}>
        <Card3 items={items} />
      </Container>

    </div>
  );
}
